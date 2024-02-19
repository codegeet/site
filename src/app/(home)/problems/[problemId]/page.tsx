

import { Metadata } from "next"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ProblemEditor } from "@/components/problem-editor"
import { Problem, languages } from "@/types/problem"

import { useState } from "react"
import { difficulties, statuses } from "@/components/data/data"
import { ArrowRightIcon, CircleIcon } from "@radix-ui/react-icons"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

export default async function ProblemPage() {



  let problem: Problem = {
    problemId: "two-sum",
    title: "Two Sum",
    number: 1,
    difficulty: "easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.",
    snippets: [
      {
        snippet: "here some java code",
        language: "java"
      },
      {
        snippet: "here some kotlin code",
        language: "kotlin"
      }
    ],
    status: "todo"
  }

  const status = statuses.find(
    (status) => status.value === problem.status
  ) || {
    label: "Unknown",
    value: "unknown",
    icon: CircleIcon,
  }

  const difficulty = difficulties.find(
    (difficulty) => difficulty.value === problem.difficulty
  ) || {
    label: "Unknown",
    value: "unknown",
    icon: ArrowRightIcon,
  }

  return (<div className="flex h-[85vh]">
    <ResizablePanelGroup
      direction="horizontal"
      className=" rounded-lg border"
    >
      <ResizablePanel defaultSize={40}>
        <div>
          <span className="font-semibold">{problem.number}. {problem.title}</span>
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
          <div className="flex items-center">
            {difficulty.icon && (
              <difficulty.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{difficulty.label}</span>
          </div>
          <span>{problem.description}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <div className="w-full ">

              <ProblemEditor problem={problem} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>

  </div>

  )
}
