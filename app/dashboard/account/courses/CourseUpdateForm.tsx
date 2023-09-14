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
import { CourseFormValues, courseFormSchema } from "@/types/profile_types"
import { Textarea } from "@/components/ui/textarea"
import { Database } from "@/types/supabase"

export function CourseUpdateForm({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: async () => {
      setLoadingData(true)

      const { data: course, error } = await supabase
        .from("courses")
        .select("course, description")
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

      course && setLoadingData(false)

      return {
        course: course?.course ?? "",
        description: course?.description ?? "",
      }
    },
  })

  async function updateProfile(value: CourseFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("courses")
      .update({
        course: value.course,
        description: value.description,
        updated_at: new Date().toISOString(),
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
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>course</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loadingData}
                  placeholder={loadingData ? "loading data..." : ""}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {loading && <PiSpinnerGap className="animate-spin mr-3" size={20} />}
          Update Course
        </Button>
      </form>
    </Form>
  )
}
