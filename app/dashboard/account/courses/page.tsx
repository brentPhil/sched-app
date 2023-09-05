import React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { toast } from "@/components/ui/use-toast"
import { DataTable } from "../components/DataTable"
import { CourseCols } from "./courseCols"
import { Database } from "@/types/supabase "
import AddDailog from "../components/AddDialog"

async function getData(){
  const supabase = createServerComponentClient<Database>({ cookies })
  let { data, error } = await supabase
    .from("courses")
    .select()
    .order("id", { ascending: true })

  error && toast({ title: error.message, description: error.message })

  return (data as any) || []
}

export default async function page() {
  const data = await getData()

  return (
    <div className="w-full lg:flex gap-3">
      <div className="flex flex-col gap-3 bg-card">
          <AddDailog table="Course" />
        <DataTable data={data} columns={CourseCols} />
      </div>
    </div>
  )
}
