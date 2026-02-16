"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { http } from "viem"
import { mainnet, sepolia, zkSync, anvil } from 'wagmi/chains' // anvil might not be exported directly, so define custom if needed

// If you need a custom Anvil chain (e.g., with a different port or chain ID)
const anvilChain = {
  id: 31337,
  name: 'Anvil',
  network: 'anvil',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
}

export const config = getDefaultConfig({
  appName: 'T-Sender',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  // Use only the chains you need – add anvil for local testing
  chains: [anvilChain, mainnet, sepolia, zkSync],
  transports: {
    [anvilChain.id]: http('http://127.0.0.1:8545'),
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY'), // replace with your own
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY'),
    [zkSync.id]: http('https://mainnet.era.zksync.io'), // or your preferred RPC
  },
  ssr: true,
})

export default config