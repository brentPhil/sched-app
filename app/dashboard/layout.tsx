import { Toaster } from "@/components/ui/toaster"
import NavBar from "./components/NavBar"
import SideMenu from "./components/SideMenu"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <SideMenu />
        <div className=" flex gap-5">
          <div className="w-full ps-56">
            <NavBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
