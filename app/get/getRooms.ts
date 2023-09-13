import { Database } from "@/types/supabase ";
import { Room } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getRooms = async (): Promise<Room[]> => {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({
      cookies: () => cookieStore,
    })

     const { data, error } = await supabase
       .from("rooms")
       .select("*")
       .order("id", { ascending: true })

       if (error) {
        console.log(error)
       }
       
       return (data as any) || []
}

export default getRooms