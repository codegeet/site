"use client"

import { ColumnDef } from "@tanstack/react-table"

import { difficulties, statuses } from "./data/data"
import { Task } from "./data/schema"
import { DataTableColumnHeader } from "./problems-table-column-header"
import { Link } from 'react-router-dom';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const rowId = row.original.id;
      return (
        <div className="flex space-x-2">
          <a href={`/problems/${rowId}`} className="max-w-[500px] truncate font-medium hover:font-bold" >
            {row.getValue("title")}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const difficulty = difficulties.find(
        (difficulty) => difficulty.value === row.getValue("difficulty")
      )

      if (!difficulty) {
        return null
      }

      return (
        <div className="flex items-center">
          {difficulty.icon && (
            <difficulty.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{difficulty.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }
]
