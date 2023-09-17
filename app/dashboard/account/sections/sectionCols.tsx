"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteAlert from "../components/AlertDialog"
import EditDailog from "../components/EditDialog"

type Section = {
  id: number
  name: string | null
  description: string
}

export const SectionCols: ColumnDef<Section>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) => {
      const section = row.original

      return <p className=" capitalize">{section.name}</p>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const section = row.original

      return (
        <div className=" w-full flex justify-end">
          <EditDailog table="sections" id={section.id} />
          <DeleteAlert
            table="sections"
            id={section.id}
            subject={section.name}
          />
        </div>
      )
    },
  },
]
