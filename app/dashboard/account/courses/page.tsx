import { cache } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { toast } from "@/components/ui/use-toast"
import { DataTable } from "../components/DataTable"
import { CourseCols } from "./courseCols"
import AddDailog from "../components/AddDialog"
import { Database } from "@/types/supabase"

async function getData() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
  let { data, error } = await supabase
    .from("courses")
    .select()
    .order("id", { ascending: true })

  if (error) {
    toast({ title: error.message, description: error.message })
    return []
  }

  return data || []
}

export default async function Page() {
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
