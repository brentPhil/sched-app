import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
// import { Records } from "@/types"

const getRecords = async (): Promise<Records[]> => {

  const supabase = createServerComponentClient({
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

export default getRecords
