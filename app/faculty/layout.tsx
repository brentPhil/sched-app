import { Providers } from "../providers"
import { Toaster } from "@/components/ui/toaster"
import SideMenu from "./components/SideMenu"
import NavBar from "./components/NavBar"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SideMenu />
        <Toaster />
        <div className="w-full relative max-w-[100rem] m-auto h-screen lg:ps-60 xl:px-60 ps-16">
          <Providers>
            <NavBar />
            <div className="pt-16">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  )
}
