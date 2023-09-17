import React from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import Clientpage from "./Client"
import { toast } from "@/components/ui/use-toast"
import ViewSchedModal from "./components/ViewSchedModal"

export default async function page() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const id = session?.user?.id

  const { data, error } = await supabase
    .from("schedules")
    .select("*, subjects(*), rooms(*), courses(*), users(*), sections(*)")
    .eq("faculty_id", id || "")
    .order("id", { ascending: true })

  if (error) {
    toast({
      title: "Error",
      description: error.message,
    })
  }

  return (
    <div className="p-5">
      <ViewSchedModal />
      <Clientpage data={(data as any) || []} />
    </div>
  )
}
