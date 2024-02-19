"use client"

import { Problem, Snippet } from "@/types/problem";
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

interface ProblemEditorProps {
  problem: Problem;
}

export const ProblemEditor: React.FC<ProblemEditorProps> = ({ problem }) => {

  const defaultlanguage = "java"

  const [editorInstance, setEditorInstance] = useState<MonacoEditorType.IStandaloneCodeEditor>();
  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

  const [language, setLanguage] = useState(defaultlanguage);
  const [snippet, setSnippet] = useState(problem.snippets.find(s => s.language === defaultlanguage)?.snippet || "")

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setSnippet(problem.snippets.find(s => s.language === value)?.snippet || "")
  }

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setEditorInstance(editor);
    setMonacoInstance(monaco);
  };

  const handleEditorChange = (value: string | undefined) => {
    setSnippet(value || problem.snippets.find(s => s.language === value)?.snippet || "");
  };

  useEffect(() => {
    if (editorInstance && language) {
      monacoInstance?.editor.setModelLanguage(editorInstance.getModel()!, language);
      editorInstance.setValue(snippet);
    }
  }, [language, editorInstance]);

  return (
    <div className="w-full h-[32vh]">
      <Select onValueChange={handleLanguageChange} defaultValue={language}>
        <SelectTrigger className="w-[180px]">
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
      <Button className="flex w-[64px]"> Run</Button>
      <Button className="flex w-[180px]"> Submit</Button>
      <Editor
        height="32vh"
        defaultLanguage="java"
        defaultValue="default"

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
  )

}