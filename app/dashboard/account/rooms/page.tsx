import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { toast } from "@/components/ui/use-toast"
import { DataTable } from "../components/DataTable"
import { RoomCols } from "./roomCols"
import { Database } from "@/types/supabase "
import AddDailog from "../components/AddDialog"

export const dynamic = "force-dynamic"

async function getData(){
  const supabase = createServerComponentClient<Database>({ cookies })
  let { data, error } = await supabase
    .from("rooms")
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
        <AddDailog table="Room" />
        <DataTable data={data} columns={RoomCols} />
      </div>
    </div>
  )
}
