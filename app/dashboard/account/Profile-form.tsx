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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { PiSpinnerGap } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { Database } from "@/types/supabase"

export function ProfileForm({ session }: { session?: Session | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: async () => {
      setLoadingData(true)

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", session?.user.id!)
        .single()

      if (error) {
        toast({
          title: "Error fetching user",
          description: error.message,
        })
        setLoadingData(false)
      }
      data && setLoadingData(false)
      return {
        email: data?.email ?? "",
        first_name: data?.first_name ?? "",
        last_name: data?.last_name ?? "",
        username: data?.username ?? "",
        address: data?.address ?? "",
        contact_no: data?.contact_no ?? "",
      }
    },
  })

  async function updateProfile(value: ProfileFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("users")
      .update({
        first_name: value.first_name,
        last_name: value.last_name,
        username: value.username,
        address: value.address,
        contact_no: value.contact_no,
        updated_at: new Date().toISOString(),
        avatar_url: "",
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
      <form onSubmit={form.handleSubmit(updateProfile)} className="space-y-5">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  disabled={loadingData}
                  placeholder={loadingData ? "loading data..." : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={loadingData}
                  placeholder={loadingData ? "loading data..." : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  disabled={loadingData}
                  placeholder={loadingData ? "loading data..." : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact_no</FormLabel>
              <FormControl>
                <Input
                  disabled={loadingData}
                  placeholder={loadingData ? "loading data..." : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading && <PiSpinnerGap className="animate-spin mr-3" size={20} />}
          Update profile
        </Button>
      </form>
    </Form>
  )
}
