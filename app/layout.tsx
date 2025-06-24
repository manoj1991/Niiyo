import { ReactNode } from "react"
import { Providers } from "./providers"
import Toast from "@/components/Toast"
import "./globals.css"  

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  )
}