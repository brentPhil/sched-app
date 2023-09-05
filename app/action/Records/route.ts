import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
// import { Records } from "@/types"

export const getSubjects = async (): Promise<Records[]> => {

  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const { data, error } = await supabase
    .from("Student")
    .select()
    .order("createdAt", { ascending: false })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}