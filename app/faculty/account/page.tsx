import React from "react"
import { ProfileForm } from "./Profile-form"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

export default async function page() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="p-5 max-w-sm">
      <ProfileForm session={session} />
    </div>
  )
}
