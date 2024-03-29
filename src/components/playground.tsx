"use client"

import { Editor, Monaco, OnMount } from "@monaco-editor/react";
import { editor as MonacoEditorType } from 'monaco-editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { useTheme } from 'next-themes';

import { cn } from "@/lib/utils";
import { languages } from "@/config/snippets";
import { ExecutionStatus, SubmissionResponse } from "@/config/types";

interface PlaygroundProps {
    code: string;
}

const Playground = () => {

    const [editorInstance, setEditorInstance] = useState<MonacoEditorType.IStandaloneCodeEditor>();
    const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState<string>(languages[language].code);
    const [stdOut, setStdOut] = useState<string | null>(null);
    const [stdErr, setStdErr] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string | undefined>("stdout");
    const [isLoading, setIsLoading] = useState(false);

    const { resolvedTheme, systemTheme } = useTheme();

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        setCode(languages[value]!.code)
    };

    const makeApiCall = async () => {
        try {
            setIsLoading(true);

            const response = await fetch('api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    language: language
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SubmissionResponse = await response.json();

            console.log(data)

            if (data.status === ExecutionStatus.FAILED || data.error !== "") {
                setActiveTab("stderr");
            } else {
                setActiveTab("stdout");
            }

            if (data.executions && data.executions.length > 0) {
                const execution = data.executions[0]
                setStdOut(execution?.std_out)
                setStdErr(data?.error || execution?.std_err)
            }

        } catch (error) {
            console.error('Error during API call:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {

        setEditorInstance(editor);
        setMonacoInstance(monaco);
    };

    const handleEditorChange = (value: string | undefined) => {
        setCode(value || languages[language].code);
    };

    const handleTabClick = (value: string | undefined) => {
        setActiveTab(value)
    };

    useEffect(() => {
        if (editorInstance && language) {
            monacoInstance?.editor.setModelLanguage(editorInstance.getModel()!, language);
            editorInstance.setValue(languages[language].code);
        }
    }, [language, editorInstance]);

    useEffect(() => {
        if (monacoInstance && editorInstance && resolvedTheme) {
            const editorTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'vs';
            monacoInstance.editor.defineTheme('myCustomTheme', {
                base: editorTheme,
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': (resolvedTheme === 'dark' ? '#030711' : '#FFFFFF'),
                }
            });
            monacoInstance.editor.setTheme('myCustomTheme');
        }
    }, [resolvedTheme, monacoInstance, editorInstance]);

    return (<>
        <div className=" w-full items-start gap-10 rounded-lg border p-6">

            <div className="flex items-center space-x-4 pb-6">
                <Select onValueChange={handleLanguageChange} defaultValue={language}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            {Object.entries(languages).map(([languageId, { name }]) => (
                                <SelectItem key={languageId} value={languageId}>{name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className="flex w-[180px]" onClick={makeApiCall}>
                    {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ''}
                    Execute</Button>

            </div>
            <div className=" h-[32vh]">
                <Editor
                    height="32vh"
                    defaultLanguage="javascript"
                    defaultValue={languages[language].code}

                    options={{
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        },
                        contextmenu: false
                    }
                    }
                    onMount={handleEditorDidMount}
                    onChange={handleEditorChange}
                />
            </div>
        </div>

        <div className={cn("w-full items-start gap-10 rounded-lg border pt-0 p-6", (stdOut || stdErr) ? "" : "hidden")}>
            <Tabs defaultValue="stdout" className="relative mt-6 w-full" value={activeTab}>
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger onClick={() => handleTabClick('stdout')} value="stdout" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">stdout</TabsTrigger>
                    <TabsTrigger onClick={() => handleTabClick('stderr')} value="stderr" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">stderr</TabsTrigger>
                </TabsList>
                <TabsContent value="stdout" className="">
                    <div className="p-4">
                        <pre className="text-left"><code>
                            {stdOut}
                        </code></pre>
                    </div>
                </TabsContent>
                <TabsContent value="stderr" className="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold">
                    <div className="p-4">
                        <pre className="text-left"><code>
                            {stdErr}
                        </code></pre>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </>
    )
}

export default Playground;