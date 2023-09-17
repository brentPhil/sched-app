import { toast } from "@/components/ui/use-toast"
import { Database } from "@/types/supabase"
import { Schedule } from "@/types/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useMemo, useState } from "react"

const useGetSched = () => {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Schedule[]>()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("*, subjects(*), rooms(*), courses(*), users(*), sections(*)")
        .order("id", { ascending: true })

      if (error) {
        setLoading(false)
        return toast({
          title: "error",
          description: error.message,
        })
      }

      console.log(data)

      setData((data as any) || [])
      setLoading(false)
    }

    fetchData()
  }, [supabase])

  return useMemo(() => ({ loading, data }), [data, loading])
}

export default useGetSched
