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
import { CourseFormValues, courseFormSchema } from "@/types/profile_types"
import { Session } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { PiSpinnerGap } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Database } from "@/types/supabase"

export function CourseForm({ session }: { session?: Session | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
  })

  async function newSub(value: CourseFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("courses")
      .insert({
        course: value.course,
        description: value.description ?? "",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      toast({
        title: "There was an error while adding course",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
    }

    if (data) {
      toast({
        title: "Course added successfully",
      })
      form.reset({
        course: "",
        description: "",
      })
      router.refresh()
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(newSub)} className="space-y-8">
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input {...field} />
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
                  placeholder="What is the course about"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {loading && <PiSpinnerGap className="animate-spin mr-3" size={20} />}
          Add Course
        </Button>
      </form>
    </Form>
  )
}
