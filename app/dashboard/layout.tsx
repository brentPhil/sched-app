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
        <div className="w-full relative h-screen lg:ps-56">
          <NavBar />
          <div className="pt-16">{children}</div>
        </div>
      </body>
    </html>
  )
}
