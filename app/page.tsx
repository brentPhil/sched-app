"use client"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"
import { LoginForm } from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [selected, setSelected] = useState<any | undefined>("login")

  return (
    <div className="h-screen overflow-hidden bg-cover bg-[url('schoolRoom.jpg')] items-center justify-center flex">
      <div>
        <Toaster />
        <Card className="max-w-full w-[340px] h-[320px] rounded-md backdrop-blur-sm bg-accent/70 border-none">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}>
              <Tab key="login" title="Login">
                <LoginForm />
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <RegisterForm />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
