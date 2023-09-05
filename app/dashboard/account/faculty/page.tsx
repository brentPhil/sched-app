import React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { toast } from "@/components/ui/use-toast"
import { DataTable } from "../components/DataTable"
import { Database } from "@/types/supabase "
import { FacultyCols } from "./facultyCols"

export const dynamic = "force-dynamic"

async function getData() {
  const supabase = createServerComponentClient<Database>({ cookies })
  let { data, error } = await supabase
    .from("users")
    .select()
    .eq("role", 1)
    .order("id", { ascending: true })

  error && toast({ title: error.message, description: error.message })

  return (data as any) || []
}

export default async function page() {
  const data = await getData()

  return (
    <div className="w-full lg:flex gap-3">
      <div className="bg-card">
        <DataTable data={data} columns={FacultyCols} />
      </div>
    </div>
  )
}
