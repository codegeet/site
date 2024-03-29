import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  status: z.string(),
  difficulty: z.string(),
})

let me: [string, boolean]
me = ["st", true]


let you: (string | boolean) []
you  = ["st", true]

export type Task = z.infer<typeof taskSchema>
