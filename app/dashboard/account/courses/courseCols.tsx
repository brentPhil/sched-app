"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteAlert from "../components/AlertDialog"
import EditDailog from "../components/EditDialog"

type Course = {
  id: number
  course: string | null
  description: string
}

export const CourseCols: ColumnDef<Course>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => {
      const course = row.original

      return <p className=" capitalize">{course.course}</p>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original

      return (
        <div className=" w-full flex justify-end">
          <EditDailog table="courses" id={course.id} />
          <DeleteAlert table="courses" id={course.id} subject={course.course} />
        </div>
      )
    },
  },
]
