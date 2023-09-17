import { toast } from "@/components/ui/use-toast"
import { Database } from "@/types/supabase"
import { Sched, Schedule } from "@/types/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useMemo, useState } from "react"

const useGetSchedById = (id?: string | null) => {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Schedule | undefined>(undefined)

  useEffect(() => {
    if (!id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("*, subjects(*), rooms(*), courses(*), users(*), sections(*)")
        .eq("id", id ?? "")
        .single()

      if (error) {
        setLoading(false)
        return toast({
          title: "error",
          description: error.message,
        })
      }

      console.log(data)

      setData(data as Schedule)
      setLoading(false)
    }

    fetchData()
  }, [id, supabase])

  return useMemo(() => ({ loading, data }), [data, loading])
}

export default useGetSchedById
