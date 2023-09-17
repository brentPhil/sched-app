"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { IconType } from "react-icons"
import { TbReportAnalytics } from "react-icons/tb"
import { FcCalendar } from "react-icons/fc"
import { usePathname } from "next/navigation"
import { FiSettings } from "react-icons/fi"
import { Image } from "@nextui-org/react"
import SchedCategory from "./accordion/SchedCategory"
import { faculty } from "@/types/types"

interface ItemProps {
  name: string
  icon?: IconType
  href: string
}

const LinkButton: React.FC<ItemProps> = ({ name, icon: Icon, href }) => {
  const pathname = usePathname()
  const path = pathname === href
  return (
    <Link
      className={`flex items-center text-muted-foreground hover:text-primary justify-center lg:justify-start rounded gap-3 p-3 hover:bg-secondary ${
        path && "bg-secondary text-primary"
      }`}
      href={href}>
      {Icon && <Icon size={25} />} <p className="hidden lg:block">{name}</p>
    </Link>
  )
}

export default function SideMenu({ faculty }: { faculty: faculty[]}) {
  return (
    <div className="lg:w-[241px] h-screen fixed z-50">
      <Card className="h-full relative rounded-none">
        <CardHeader className="p-2">
          <CardTitle>
            <Link
              href="/"
              className="flex lg:gap-3 my-3 lg:justify-start lg:p-2 justify-center items-center">
              <Image
                isBlurred
                width={50}
                radius="full"
                src="/OIP.jpg"
                alt="NextUI Album Cover"
              />
              <div>
                <p className="hidden lg:block text-xl font-bold tracking-wider leading-6">
                  EVSU-TC
                </p>
                <p className="hidden lg:block text-sm font-light leading-6 tracking-wide">
                  SUBJECT-SCHED
                </p>
              </div>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-3">
          <LinkButton icon={FcCalendar} name="Schedules" href="/dashboard" />

          <div className="px-[5px] hidden lg:block border-y">
            <SchedCategory faculty={faculty} />
          </div>

          <LinkButton
            icon={FiSettings}
            name="Account Settings"
            href="/dashboard/account"
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}
