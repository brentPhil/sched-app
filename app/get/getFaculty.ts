import { Database } from "@/types/supabase"
import { faculty } from "@/types/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getFaculty = async (): Promise<faculty[]> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", 1)
    .order("id", { ascending: true })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}

export default getFaculty
