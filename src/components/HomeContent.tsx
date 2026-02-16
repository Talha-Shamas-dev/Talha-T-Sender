"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import AirdropForm from "@/components/AirdropForm";

export default function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-50 dark:bg-gray-900 p-6 gap-6">
      <header className="flex w-full max-w-4xl items-center justify-between px-6 py-4 shadow-sm bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Talha-T-Sender</h1>
          <a
            href="https://github.com/Talha-Shamas-dev/Talha-T-Sender.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
        <ConnectButton />
      </header>

      <main className="w-full max-w-md">
        <AirdropForm />
      </main>
    </div>
  );
}