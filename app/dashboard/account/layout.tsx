import { Metadata } from "next"
import { SidebarNav } from "./components/SideBar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/account",
  },
  {
    title: "Subjects",
    href: "/dashboard/account/subjects",
  },
  {
    title: "Courses",
    href: "/dashboard/account/courses",
  },
  {
    title: "Rooms",
    href: "/dashboard/account/rooms",
  },
  {
    title: "Faculty",
    href: "/dashboard/account/faculty",
  },
  {
    title: "Section",
    href: "/dashboard/account/sections",
  },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[90vh] flex-col border rounded-md m-5">
      <div className="space-y-0.5 border-b bg-secondary p-5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row h-full overflow-y-auto">
        <aside className="lg:w-1/5 lg:border-r bg-card bottom-0 px-5 pt-5">
          <SidebarNav
            className=" border-b lg:border-none"
            items={sidebarNavItems}
          />
        </aside>
        <div className="flex-1 lg:max-w-4xl p-5 h-full">{children}</div>
      </div>
    </div>
  )
}
