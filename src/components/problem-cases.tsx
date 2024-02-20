"use client"

import { ArrowRightIcon, ChevronRight, CircleIcon, PlusCircle } from "lucide-react";
import { Case, Problem } from "@/types/problem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useState } from "react";

interface ProblemCasesProps {
    problem: Problem;
    cases: string[][];
    setCases: Dispatch<SetStateAction<string[][]>>
}

export const ProblemCases: React.FC<ProblemCasesProps> = ({ problem, cases, setCases }) => {

    const [activeTab, setActiveTab] = useState("case" + 0);

    const addNewCase = () => {
        if (cases.length < 10) {
            const newCases = [...cases, cases[cases.length - 1]];
            setCases(newCases);
            setActiveTab("case" + (newCases.length - 1 || 0))
        }
    };

    const handleTabClick = (value: string) => {
        setActiveTab(value)
    };

    const handleCaseChange = (value: string, index: number, inputIndex: number) => {
        const updated = cases
        updated[index][inputIndex] = value
        setCases(updated)
    };

    return (
        <div>
            <Tabs defaultValue="case0" className="" value={activeTab}>
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 md:h-14">
                    {cases.map((caseItem, index) => (
                        <TabsTrigger key={"case" + index} value={"case" + index} onClick={() => handleTabClick("case" + index)} className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Case {index + 1}</TabsTrigger>
                    ))}
                    <Button variant="ghost" size="icon" onClick={addNewCase}>
                        <PlusCircle className="h-4 w-4 mb-1" />
                    </Button>
                    <TabsTrigger value="result" onClick={() => handleTabClick("result")} className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Test Results</TabsTrigger>
                </TabsList>
                {cases.map((caseItem, i) => (
                    <TabsContent key={"case" + i} value={"case" + i}>
                        <div className="grid gap-6 pl-6 pt-2">
                            {caseItem.map((inputValue, j) => (
                                <div key={`${i}_${j}`} className="grid gap-2">
                                    <Label htmlFor={`${i}_${j}`} className="font-mono">{problem.metadata.params[j].name}</Label>
                                    <Input id={`${i}_${j}`} onChange={(event) => handleCaseChange(event.target.value, i, j)} placeholder="" defaultValue={inputValue} className="font-mono w-[360px]" />
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                ))}

                <TabsContent value="result"><div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Run you code first</span>
                </div></TabsContent>
            </Tabs>
        </div>
    )
}
