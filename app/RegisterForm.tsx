"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import { Button, Input } from "@nextui-org/react"
import { MdAlternateEmail } from "react-icons/md"
import { TbLockCheck } from "react-icons/tb"
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai"

const formSchema = z
  .object({
    email: z.string().min(2, "Email required").email(),
    password: z.string().min(1, "Password required").max(16),
    confirmPassword: z.string().min(1, "Confirm Password required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  })

export default function RegisterForm() {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      router.refresh()

      if (error) {
        throw error
      }

      toast({
        title: "Registration Successful",
        description: "Please check your email for verification" + data.session,
      })
      setIsLoading(false)
    } catch (error) {
      toast({
        title: "Registration error",
        description: "There was an error while registering",
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
                  size="md"
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
                  size="md"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  size="md"
                  type="password"
                  endContent={<TbLockCheck size={20} />}
                  label="Confirm Password"
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
          variant="solid"
          color="primary"
          className="w-full mt-5"
          size="md"
          isLoading={isLoading}
          disabled={isLoading}>
          Sign In
        </Button>
      </form>
    </Form>
  )
}
