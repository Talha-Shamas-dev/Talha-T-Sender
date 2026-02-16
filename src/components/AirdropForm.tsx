"use client";

import { useState, useMemo } from "react";
import { readContract, writeContract } from "@wagmi/core";
import { useAccount, useChainId } from "wagmi";
import InputField from "@/components/ui/InputField";
import { chainsToTSender, erc20Abi } from "@/constants";
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import config from "@/rainbowkitConfig"; // Wagmi + RainbowKit config

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chainId = useChainId();
  const { address, isConnected } = useAccount();

  const totalAmountNeed = useMemo(() => calculateTotal(amount), [amount]);

  // Get the TSender contract address for the current chain
  const tSenderAddress = chainsToTSender[chainId]?.tsender;

  async function getApprovedAmount(): Promise<number> {
    if (!tSenderAddress || !address) return 0;

    try {
      const allowance = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, tSenderAddress as `0x${string}`],
        chainId,
      });
      return Number(allowance);
    } catch (err) {
      console.error("Allowance check failed:", err);
      return 0;
    }
  }

  async function handleSubmit() {
    if (!isConnected) return alert("Please connect your wallet.");
    if (!tokenAddress || !recipientAddress || !amount) return alert("All fields are required.");
    if (!tSenderAddress) return alert("Unsupported chain.");

    setIsLoading(true);

    try {
      const approvedAmount = await getApprovedAmount();

      // Approve if needed
      if (approvedAmount < totalAmountNeed) {
        const approvalHash = await writeContract({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [tSenderAddress as `0x${string}`, BigInt(totalAmountNeed)],
          chainId,
        });

        console.log("Approval tx sent:", approvalHash);
        // RainbowKit/Wagmi automatically waits for tx confirmation if you use their hooks; otherwise you can manually wait
      }

      console.log("Ready to send:", { tokenAddress, recipientAddress, totalAmountNeed });
      // TODO: call your TSender contract here for airdrop

      alert("Airdrop ready! Check console for details.");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed! See console for details.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Token Airdrop
      </h2>

      <InputField
        label="Token Address"
        placeholder="0x1234...abcd"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />

      <InputField
        label="Recipient Address"
        placeholder="0x1234...abcd"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        large
      />

      <InputField
        label="Amount"
        placeholder="100, 200, etc."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        large
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Send Tokens"}
      </button>
    </div>
  );
}