import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/Headers";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "TSender",
  description: "Hyper gas-optimized bulk ERC20 token transfer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/T-Sender.svg" sizes="any" />
      </head>
      <body className="bg-zinc-50">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}