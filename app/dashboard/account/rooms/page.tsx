import React, { cache } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "../components/DataTable"
import { RoomCols } from "./roomCols"
import { Database } from "@/types/supabase"
import AddDailog from "../components/AddDialog"

async function getData() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  let { data, error } = await supabase
    .from("rooms")
    .select()
    .order("id", { ascending: true })

  error && console.log(error.message)

  return (data as any) || []
}

export default async function page() {
  const data = await getData()

  return (
    <div className="w-full lg:flex gap-3">
      <div className="flex flex-col gap-3 bg-card">
        <AddDailog table="Room" />
        <DataTable data={data} columns={RoomCols} />
      </div>
    </div>
  )
}
