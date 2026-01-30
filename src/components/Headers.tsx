import Image from "next/image"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"
import React from "react"

export default function Headers() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        background: "white",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Optional logo: replace with your imported image or a string URL */}
        {/* <Image src={logo} alt="logo" width={40} height={40} /> */}

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700 }}>
            T Sender
          </h1>

          <a
            href="https://github.com/your-org/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub repository"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.35rem",
              borderRadius: 6,
              color: "inherit",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.06)",
              background: "transparent",
            }}
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <ConnectButton />
      </div>
    </header>
  )
}