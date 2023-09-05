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
import {
  HiOutlineHome,
  HiOutlineChartSquareBar,
  HiOutlineCalendar,
} from "react-icons/hi"
import { FcCalendar } from "react-icons/fc"
import { usePathname } from "next/navigation"

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
        path && "bg-secondary text-primary-foreground"
      }`}
      href={href}>
      {Icon && <Icon size={25} />} <p className="hidden lg:block">{name}</p>
    </Link>
  )
}

export default function SideMenu() {
  return (
    <div className="lg:w-[241px] h-screen fixed z-50">
      <Card className="h-full relative rounded-none">
        <CardHeader className="p-2">
          <CardTitle>
            <Link href="/" className="flex gap-2 p-2 items-center">
              <FcCalendar size={30} />
              <p className="hidden lg:block">EVSU-SUBSCHED</p>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <LinkButton icon={HiOutlineHome} name="home" href="/dashboard" />
          <LinkButton
            icon={HiOutlineCalendar}
            name="Schedule"
            href="/"
          />
          <LinkButton
            icon={HiOutlineChartSquareBar}
            name="Reports"
            href="/"
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}
