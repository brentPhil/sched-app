import { Schedule, faculty } from "./../../types/types"
import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { UUID } from "crypto"
import { cookies } from "next/headers"
interface IParams {
  faculty_id?: UUID
}
const getSchedFaculty = async ({
  params,
}: {
  params: IParams
}): Promise<Schedule[]> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const { faculty_id } = params

  const { data, error } = await supabase
    .from("schedules")
    .select("*, subjects(*), rooms(*), courses(*), users(*), sections(*)")
    .eq("faculty_id", `${faculty_id}`)
    .order("id", { ascending: true })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}

export default getSchedFaculty
