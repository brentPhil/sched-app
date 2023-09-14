import { toast } from "@/components/ui/use-toast"
import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useMemo, useState } from "react"

const useGetSchedById = (id?: string | null) => {
  const supabase = createClientComponentClient<Database>()
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState<any | null >({})

  useEffect(() => {
    if (!id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("schedules")
        .select("*, subjects(subject), rooms(room), courses(course), users(*)")
        .eq("id", id ?? "")
        .single()

      if (error) {
        setLoading(false)
        return toast({
          title: 'error',
          description: error.message,
        })        
      }

      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [id, supabase])

  return useMemo(() => ({ loading, data }), [data, loading])
}

export default useGetSchedById
