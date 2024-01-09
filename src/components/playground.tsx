"use client";

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

    const [editor, setEditor] = useState<MonacoEditorType.IStandaloneCodeEditor>();
    const [language, setLanguage] = useState("java");
    const [code, setCode] = useState<string>(languages[language].code);

    const { theme } = useTheme();

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        setCode(languages[value]!.code)
    };


    const handleEditorDidMount: OnMount = (editor, monaco) => {
        
        const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs';

        monaco.editor.defineTheme('myCustomTheme', {
            base: theme === 'dark' ? 'vs-dark' : 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': (theme === 'dark' ? '#030711' : '#FFFFFF') ,
            }
        });

        // Set the custom theme to the editor
        monaco.editor.setTheme('myCustomTheme');

        setEditor(editor);
    };

    useEffect(() => {
        if (editor && language) {
            MonacoEditorType.setModelLanguage(editor.getModel()!, language);
            editor.setValue(languages[language].code);
        }
    }, [language, editor]);

    return (<>
        <div className="flex items-center space-x-4">
            <Select onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        {Object.keys(languages).map((language) => (
                            <SelectItem value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</SelectItem>
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