import React from "react"
import { ModeToggle, UserNav } from "./Dropdown"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase "
import { toast } from "@/components/ui/use-toast"

export const dynamic = "force-dynamic"

export default async function NavBar() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", session?.user?.id ?? "")
    .single()

  error && toast({ title: error.message, description: error.message })

  return (
    <nav className=" py-3 px-5 right-0 left-0 lg:pl-56 flex justify-between fixed bg-card border items-center">
      <div className="w-56 lg:px-5">LOGO HERE</div>
      <div className="flex gap-5 h-fit">
        <div className="w-56"></div>
        <UserNav username={data?.username} email={data?.email} />
        <ModeToggle />
      </div>
    </nav>
  )
}
