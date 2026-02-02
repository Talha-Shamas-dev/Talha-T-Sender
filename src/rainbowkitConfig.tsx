"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, sepolia, zkSync } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'T-Sender',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [mainnet, sepolia, zkSync],
  ssr: true,
})
  
export default config