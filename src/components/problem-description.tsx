import { ArrowRightIcon, CircleIcon } from "lucide-react";
import { difficulties, statuses } from "./data/data";
import { Problem } from "@/types/problem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProblemDescriptionProps {
    problem: Problem;
}


export const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
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

    return (
        <div className="">
            <Tabs defaultValue="description" className="relative w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 md:h-12 ">
                    <TabsTrigger value="description" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Description</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="">
                <div className="">
                    <div className=" container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                        <h2 className="text-lg font-semibold">{problem.number}. {problem.title}</h2>
                        <div className="ml-auto flex space-x-2 sm:justify-end">
                            <div className="flex items-center mr-2">
                                {difficulty.icon && (
                                    <difficulty.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{difficulty.label}</span>
                            </div>
                            <div className="flex items-center">
                                {status.icon && (
                                    <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{status.label}</span>
                            </div>
                        </div>
                    </div>
                    <span>{problem.description}</span>
                </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

