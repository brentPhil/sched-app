"use client"

import { ColumnDef } from "@tanstack/react-table"

import DeleteAlert from "../components/AlertDialog"
import EditDailog from "../components/EditDialog"

type Room = {
  id: number
  room: string | null
  description: string
}

export const RoomCols: ColumnDef<Room>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => {
      const room = row.original

      return <p className=" capitalize">{room.room}</p>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const room = row.original

      return (
        <div className=" w-full flex justify-end">
          <EditDailog table="rooms" id={room.id} />
          <DeleteAlert table="rooms" id={room.id} subject={room.room} />
        </div>
      )
    },
  },
]
