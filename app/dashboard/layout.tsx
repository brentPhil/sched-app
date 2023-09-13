import { Toaster } from "@/components/ui/toaster"
import NavBar from "./components/NavBar"
import SideMenu from "./components/SideMenu"
import { Providers } from "../providers"

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
        <div className="w-full relative max-w-[90rem] m-auto h-screen lg:ps-60 xl:px-60 ps-16">
          <NavBar />
          <Providers>
            <div className="pt-16">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  )
}
