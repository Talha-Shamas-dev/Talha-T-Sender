"use client";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient: wagmiPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: wagmiPublicClient,
});