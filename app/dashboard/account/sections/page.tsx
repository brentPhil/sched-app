import React, { cache } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DataTable } from "../components/DataTable"
import { Database } from "@/types/supabase"
import AddDailog from "../components/AddDialog"
import { SectionCols } from "./sectionCols"

async function getTasks() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  let { data, error } = await supabase
    .from("sections")
    .select()
    .order("id", { ascending: true })

  error && console.log(error.message)

  return (data as any) || []
}

export default async function page() {
  const tasks = await getTasks()

  return (
    <div className="w-full lg:flex gap-3">
      <div className="flex flex-col gap-3 bg-card">
        <AddDailog table="Section" />
        <DataTable data={tasks} columns={SectionCols} />
      </div>
    </div>
  )
}
