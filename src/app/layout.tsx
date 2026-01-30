import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Tsender",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
         <Providers>
          {children}
        </Providers>
       
      </body>
    </html>
  )
}
