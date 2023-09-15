"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { PiSpinnerGap } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { FacultyFormValues, facultyFormSchema } from "@/types/profile_types"
import { Database } from "@/types/supabase"

export function FacultyUpdateForm({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<FacultyFormValues>({
    resolver: zodResolver(facultyFormSchema),
    defaultValues: async () => {
      setLoadingData(true)

      const { data: faculty, error } = await supabase
        .from("users")
        .select()
        .eq("id", id)
        .single()

      if (error) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        })
        setLoadingData(false)
      }

      faculty && setLoadingData(false)

      return {
        first_name: faculty?.first_name ?? "",
        last_name: faculty?.last_name ?? "",
        username: faculty?.username ?? "",
        address: faculty?.address ?? "",
        contact_no: faculty?.contact_no ?? "",
        email: faculty?.email ?? "",
      }
    },
  })

  async function updateProfile(value: FacultyFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("users")
      .update({
        username: value.username,
        first_name: value.first_name,
        last_name: value.last_name,
        address: value.address,
        role: 1,
        contact_no: value.contact_no,
        updated_at: new Date().toISOString(),
        avatar_url: "",
      })
      .eq("id", id)
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
          Update Faculty
        </Button>
      </form>
    </Form>
  )
}
