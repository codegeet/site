"use client"

import { Editor, Monaco, OnMount } from "@monaco-editor/react";
import { editor as MonacoEditorType } from 'monaco-editor';

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

const javaCode = `public class Demo {

    public static void main(String[] args) {
        System.out.println("The 5th Fibonacci number is: " + fibonacci(5));
    }

    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
`;

const pythonCode = `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print("The 5th Fibonacci number is:", fibonacci(5))
`;

type LanguageCode = {
    [key: string]: {
        code: string;
    };
};

const languages: LanguageCode = {
    "java": {
        code: javaCode
    },
    "python": {
        code: pythonCode
    }
}

interface PlaygroundProps {
    code: string;
}

const Playground = () => {

    const [editorInstance, setEditorInstance] = useState<MonacoEditorType.IStandaloneCodeEditor>();
    const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState<string>(languages[language].code);

    const { resolvedTheme, systemTheme } = useTheme();

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        setCode(languages[value]!.code)
    };



    const handleEditorDidMount: OnMount = (editor, monaco) => {

        setEditorInstance(editor);
        setMonacoInstance(monaco);
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
        <div className="flex items-center space-x-4">
            <Select onValueChange={handleLanguageChange} defaultValue={language}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        {Object.keys(languages).map((language) => (
                            <SelectItem key={language} value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button className="flex w-[180px]" >Execute</Button>

        </div>
        <div className="items-center space-x-4 h-[40vh]">
            <Editor
                height="40vh"
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
            />
        </div>
    </>
    )
}

export default Playground;