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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

const formSchema = z.object({
  email: z.string().min(2, "Email required").email(),
  password: z.string().min(1, "Password required").max(8),
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

  return (
    <Card className=" w-96 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <br />
            <CardTitle className=" text-2xl font-bold text-center text-accent-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className=" text-center">
              Please enter your details to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex flex-col gap-3 py-0">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator className="my-5" />
          <CardFooter>
            <Button
              type="submit"
              variant="default"
              className="w-full"
              size="lg"
              disabled={isLoading}>
              {isLoading ? (
                <PiSpinner className=" animate-spin" size={25} />
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
