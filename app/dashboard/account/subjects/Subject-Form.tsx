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
import { SubjectFormValues, subjectFormSchema } from "@/types/profile_types"
import { Session } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import { PiSpinnerGap } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Database } from "@/types/supabase"

export function SubjectForm({ session }: { session?: Session | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectFormSchema),
  })

  async function newSub(value: SubjectFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("subjects")
      .insert({
        subject: value.subject,
        description: value.description ?? "",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      toast({
        title: "There was an error while adding subject",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
    }

    if (data) {
      toast({
        title: "Subject added successfully",
      })
      form.reset({
        subject: "",
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
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjcode</FormLabel>
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
                  placeholder="What is the subject about"
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
          Add Subject
        </Button>
      </form>
    </Form>
  )
}
