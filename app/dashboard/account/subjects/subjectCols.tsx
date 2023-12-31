"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteAlert from "../components/AlertDialog"
import EditDailog from "../components/EditDialog"

type Subject = {
  id: number
  subject: string | null
  units: string | null
  description: string
}

export const SubjectCols: ColumnDef<Subject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.original

      return <p className=" capitalize">{subject.subject}</p>
    },
  },
  {
    accessorKey: "units",
    header: "Units",
    cell: ({ row }) => {
      const subject = row.original

      return <p className=" capitalize">{subject.units}</p>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const subject = row.original

      return (
        <div className=" w-full flex justify-end">
          <EditDailog table="subjects" id={subject.id} />
          <DeleteAlert
            table="subjects"
            id={subject.id}
            subject={subject.subject}
          />
        </div>
      )
    },
  },
]
