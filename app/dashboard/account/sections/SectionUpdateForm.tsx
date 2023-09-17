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
import { SectionFormValues, sectionFormSchema } from "@/types/profile_types"
import { Textarea } from "@/components/ui/textarea"
import { Database } from "@/types/supabase"

export function SectionUpdateForm({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const supabase = createClientComponentClient<Database>()

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: async () => {
      setLoadingData(true)

      const { data: section, error } = await supabase
        .from("sections")
        .select("name, description")
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

      section && setLoadingData(false)

      return {
        name: section?.name ?? "",
        description: section?.description ?? "",
      }
    },
  })

  async function updateProfile(value: SectionFormValues) {
    setLoading(true)
    let { data, error } = await supabase
      .from("sections")
      .update({
        section: value.name,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>section</FormLabel>
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
          Update Section
        </Button>
      </form>
    </Form>
  )
}
