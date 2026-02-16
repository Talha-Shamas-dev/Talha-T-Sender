"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";
import React from "react";

export default function Header() {
  return (
    <header
      className="flex h-16 items-center justify-between px-6 shadow-sm"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Talha-T-Sender</h1>
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
  );
}