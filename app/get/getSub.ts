import { Database } from "@/types/supabase"
import { Subjects } from "@/types/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getSub = async (): Promise<Subjects[]> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}

export default getSub
