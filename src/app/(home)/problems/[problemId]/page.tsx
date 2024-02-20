

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
import { ProblemDescription } from "@/components/problem-description"
import { ProblemCases } from "@/components/problem-cases"
import { ProblemPlayground } from "@/components/problem-playground"

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
        snippet: `class Solution {
          public int[] twoSum(int[] nums, int target) {
              int n=nums.length;
              Map<Integer,Integer> map=new HashMap<>();
              int[] result=new int[2];
              for(int i=0;i<n;i++){
                  if(map.containsKey(target-nums[i])){
                      result[1]=i;
                      result[0]=map.get(target-nums[i]);
                      return result;
                  }
                  map.put(nums[i],i);
              }
              return result;
          }
      }`,
        language: "java"
      },
      {
        snippet: `class Solution {
          fun twoSum(nums: IntArray, target: Int): IntArray {
              for(i in 0..nums.size-1) {
                  for (j in i+1..nums.size-1) {
                      if (nums[i] + nums[j] == target) {
                          return intArrayOf(i, j)
                      }
                  }
              }
              return intArrayOf()
          }
      }`,
        language: "kotlin"
      }
    ],
    status: "todo",
    cases: [{ input: "[2, 7, 11, 15]\n9" }, { input: "[3, 2, 4]\n6" }, { input: "[3, 3]\n6" }],
    metadata: {
      name: "twoSum",
      params: [{ name: "nums" }, { name: "target" }]
    }
  }

  return (<div className="flex h-screen" >
    <ResizablePanelGroup
      direction="horizontal"
      className=" rounded-lg border"
    >
      <ResizablePanel defaultSize={40}>
        <ProblemDescription problem={problem} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <ProblemPlayground problem={problem} />
      </ResizablePanel>
    </ResizablePanelGroup>

  </div >

  )
}
