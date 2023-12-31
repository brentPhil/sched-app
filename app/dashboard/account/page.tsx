import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ProfileForm } from "./Profile-form"
import { Database } from "@/types/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cache } from "react"

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <Card className="rounded-md max-w-md">
      <CardHeader>
        <CardTitle>Personal Info</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-5">
        <ProfileForm session={session} />
      </CardContent>
    </Card>
  )
}
