"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteAlert from "../components/AlertDialog"
import EditDailog from "../components/EditDialog"

type Faculty = {
  id: number
  first_name: string
  last_name: string
  username: string
  address: string
  contact_no: string
  email: string
}

export const FacultyCols: ColumnDef<Faculty>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => {
      const faculty = row.original

      return (
        <p className=" capitalize truncate">
          {faculty.last_name + ", " + faculty.first_name}
        </p>
      )
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "address",
    cell: ({ row }) => {
      const faculty = row.original
      return <p className=" capitalize truncate">{faculty.address}</p>
    },
  },
  {
    accessorKey: "contact_no",
    header: "contact_no",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const faculty = row.original

      return (
        <div className=" w-full flex justify-end">
          <EditDailog table="faculty" id={faculty.id} />
          <DeleteAlert
            table="faculty"
            id={faculty.id}
            subject="Faculty Member"
          />
        </div>
      )
    },
  },
]
