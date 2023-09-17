"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { IoWarningOutline } from "react-icons/io5"
import { useState } from "react"
import { PiSpinner } from "react-icons/pi"
import { Separator } from "@/components/ui/separator"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import { Input } from "@nextui-org/react"
import { MdAlternateEmail } from "react-icons/md"
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai"

const formSchema = z.object({
  email: z.string().min(2, "Email required").email(),
  password: z.string().min(1, "Password required").max(16),
})

export const LoginForm = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    router.refresh()

    if (error) {
      toast({
        description: (
          <div className=" flex gap-3">
            <IoWarningOutline size={20} /> Incorrect Email or Password
          </div>
        ),
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  label="Email"
                  endContent={<MdAlternateEmail size={20} />}
                  type="email"
                  variant="underlined"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}>
                      {isVisible ? (
                        <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <AiTwotoneEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  variant="underlined"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className="w-full mt-5"
          size="lg"
          disabled={isLoading}>
          {isLoading ? (
            <PiSpinner className=" animate-spin" size={25} />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  )
}
