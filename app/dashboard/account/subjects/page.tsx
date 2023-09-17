import React, { cache } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { SubjectCols } from "./subjectCols"
import { DataTable } from "../components/DataTable"
import { Database } from "@/types/supabase"
import AddDailog from "../components/AddDialog"

async function getTasks() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  let { data, error } = await supabase
    .from("subjects")
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
        <AddDailog table="Subject" />
        <DataTable data={tasks} columns={SubjectCols} />
      </div>
    </div>
  )
}
