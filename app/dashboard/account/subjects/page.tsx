import React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { toast } from "@/components/ui/use-toast"
import { SubjectCols } from "./subjectCols"
import { DataTable } from "../components/DataTable"
import { Database } from "@/types/supabase "
import AddDailog from "../components/AddDialog"

export const dynamic = "force-dynamic"

async function getTasks(){
  const supabase = createServerComponentClient<Database>({ cookies })
  let { data, error } = await supabase
    .from("subjects")
    .select()
    .order("id", { ascending: true })

  error && toast({ title: error.message, description: error.message })

  return (data as any) || []
}

export default async function page() {
  const tasks = await getTasks()

  return (
    <div className="w-full lg:flex gap-3">
      <div className="flex flex-col gap-3 bg-card">
        <AddDailog table='Subject' />
        <DataTable data={tasks} columns={SubjectCols} />
      </div>
    </div>
  )
}
