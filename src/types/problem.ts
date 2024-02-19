
export type Problem = {
    problemId: string;
    title: string;
    number: number;
    description: string;
    difficulty: string;
    status: string;
    snippets: Snippet[]
}

export type Snippet = {
    snippet: string;
    language: string;
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
  