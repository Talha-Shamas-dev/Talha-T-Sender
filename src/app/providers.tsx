"use client";

import { ReactNode } from "react";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "@/wagmiClient";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}