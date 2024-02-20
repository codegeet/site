
export type Problem = {
    problemId: string;
    title: string;
    number: number;
    description: string;
    difficulty: string;
    status: string;
    metadata: Metadata;
    snippets: Snippet[];
    cases: Case[];
}

export type Snippet = {
    snippet: string;
    language: string;
}

export type Case = {
    input: string;
}

export type Metadata = {
    name: string;
    params: { name: string }[]
}

export const languages = [
    {
        name: "java",
        label: "Java"
    },
    {
        name: "kotlin",
        label: "Kotlin"
    }
]
