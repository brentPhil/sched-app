"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { ProfileFormValues, profileFormSchema } from "@/types/profile_types"
import { Session } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { PiSpinnerGap } from "react-icons/pi"
import { useRouter } from "next/navigation"

export function ProfileForm({ session }: { session: Session | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("full_name, username")
        .eq("id", session?.user.id!)
        .single()

      if (error) {
        toast({
          title: "Error fetching profile",
          description: error.message,
        })
      }

      return {
        email: session?.user.email ?? "",
        fullname: profile?.full_name ?? "",
        username: profile?.username ?? "",
      }
    },
  })

  async function updateProfile(value: ProfileFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: value.fullname,
        username: value.username,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session?.user.id!)
      .select()

    if (error) {
      toast({
        title: "Error updating the data!",
        description: error.message,
      })
      setLoading(false)
    }

    if (data) {
      toast({
        title: "Update Success",
        description: "Profile updated successfully",
      })
      router.refresh()
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateProfile)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>fullname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {loading && <PiSpinnerGap className="animate-spin mr-3" size={20} />}
          Update profile
        </Button>
      </form>
    </Form>
  )
}
