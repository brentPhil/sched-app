import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

export default function SideMenu() {
  return (
    <div className="w-56 h-screen fixed z-50">
      <Card className="h-full relative rounded-none">
        <CardHeader>
          <CardTitle>
            LOGO HERE
          </CardTitle>
        </CardHeader>
        <CardContent className="">

        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  )
}
