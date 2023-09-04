import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getProfileInfo = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", session?.user.id ?? '')
    .single()

  if (error) {
    return null
  }

  return data
}

export default getProfileInfo
