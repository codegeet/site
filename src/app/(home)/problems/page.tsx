
import { taskSchema } from "@/components/data/schema"
import { DataTable } from "@/components/problems-table"
import { columns } from "@/components/problems-table-columns"
import { Metadata } from "next"
import path from "path"
import { promises as fs } from "fs"
import { z } from "zod"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/data/tasks.json")
  )

  const problems = JSON.parse(data.toString())

  return z.array(taskSchema).parse(problems)
}
export default async function TaskPage() {
  const problems = await getTasks()

  return (<>
      <div className="md:hidden">

      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>

        </div>
        <DataTable data={problems} columns={columns} />
      </div>
      
  </>

  )
}
