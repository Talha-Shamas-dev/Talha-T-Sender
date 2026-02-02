"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"
import React from "react"

export default function Header() {  // The component is named Header
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-900">Talha-T-Sender</h1>
        <a
          href="https://github.com/Talha-Shamas-dev/Talha-T-Sender.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 text-gray-500"
        >
          <FaGithub className="h-5 w-5" />
        </a>
      </div>
      <ConnectButton />
    </header>
  )
}