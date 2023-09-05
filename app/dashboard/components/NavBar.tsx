import React, { cache } from "react"
import { ModeToggle, UserNav } from "./Dropdown"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase "
import { toast } from "@/components/ui/use-toast"

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})


export default async function NavBar() {
  const supabase = createServerSupabaseClient()
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
    <nav className=" py-3 px-5 border right-0 left-0 lg:pl-60 ps-16 flex justify-end fixed items-center">
      <div className="flex gap-5 h-fit">
        <UserNav username={data?.username} email={data?.email} />
        <ModeToggle />
      </div>
    </nav>
  )
}
