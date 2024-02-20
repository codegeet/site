"use client"

import { ArrowRightIcon, ChevronRight, CircleIcon, PlusCircle } from "lucide-react";
import { Problem } from "@/types/problem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { ProblemEditor } from "./problem-editor";
import { ProblemCases } from "./problem-cases";
interface ProblemPlaygroundProps {
    problem: Problem;
}

export const ProblemPlayground: React.FC<ProblemPlaygroundProps> = ({ problem }) => {

    const [cases, setCases] = useState(problem.cases.map(caseItem => (caseItem.input.split('\n'))));

    return (
        
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="w-full ">
              <ProblemEditor problem={problem} cases={cases}/>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <ProblemCases problem={problem} cases={cases} setCases={setCases}  />
          </ResizablePanel>
        </ResizablePanelGroup>
        
    )
}
