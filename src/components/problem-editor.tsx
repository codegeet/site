"use client"

import { Case, Problem, Snippet } from "@/types/problem";
import { Editor, Monaco, OnMount } from "@monaco-editor/react";
import { editor as MonacoEditorType } from 'monaco-editor';

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
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { PlusCircle, RotateCcw } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ProblemEditorProps {
  problem: Problem;
  cases: string[][];
}

export const ProblemEditor: React.FC<ProblemEditorProps> = ({ problem, cases }) => {

  const defaultlanguage = "java"

  const getSnippet = (language: string): string => {
    return problem.snippets.find(s => s.language === language)?.snippet || ""
  }

  const [editorInstance, setEditorInstance] = useState<MonacoEditorType.IStandaloneCodeEditor>();
  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

  const [language, setLanguage] = useState('java');
  const [snippet, setSnippet] = useState(getSnippet(language))
  const [isLoading, setIsLoading] = useState(false);


  const handleLanguageChange = (value: string) => {
    console.log(value)
    setLanguage(value)
    setSnippet(problem.snippets.find(s => s.language === value)?.snippet || '')
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);
  };

  const handleEditorChange = (value: string | undefined) => {
    setSnippet(value || '');
    // if (editorInstance) {
    //   editorInstance.setValue(snippet);
    // }
  };

  const resetSnippet = () => {
     setSnippet(getSnippet(language))
  };

  // useEffect(() => {
  //   if (editorInstance && language) {
  //     monacoInstance?.editor.setModelLanguage(editorInstance.getModel()!, language);
  //     editorInstance.setValue(snippet);
  //   }
  // }, [language, editorInstance]);

  const runCode = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://yourbackend.com/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          snippet: snippet,
          problem_id: problem.problemId,
          inputs: cases.map(inputs => (inputs.join('\n')))
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Result:', data);
    } catch (error) {
      console.error('Error:', error);
    }finally {
            setIsLoading(false);
        }
  };

  return (
    <div className="w-full h-[32vh]">
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 ">

          <Select onValueChange={handleLanguageChange} defaultValue={language} >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {problem.snippets.map(snippet => (
                  <SelectItem key={snippet.language} value={snippet.language}>{snippet.language}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={runCode} variant="outline" className="flex w-[80px] h-9 ml-4 font-semibold">{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ''}Run</Button>
          <Button onClick={runCode} variant="secondary" className="flex w-[180px] h-9 ml-4 font-semibold">{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ''}Submit</Button>
          <div className="ml-auto flex space-x-2 sm:justify-end ">
            <Button variant="ghost" size="icon" onClick={resetSnippet}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Editor
            height="32vh"
            defaultLanguage={language}
            defaultValue={getSnippet(language)}
            value={snippet}
            language={language}
            options={{
              fontSize: 14,
              minimap: {
                enabled: false
              },
              contextmenu: false
            }}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
          />
        </div>
      </div>

    </div >
  )

}