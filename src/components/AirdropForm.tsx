"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/ui/InputField";
import { chainsToTSender, erc20Abi } from "@/constants";
import {
  useChainId,
  useConfig,
  useAccount,
  useWriteContract,
} from "wagmi";
import { readContract } from "@wagmi/core";
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import { waitForTransactionReceipt } from "viem/actions";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const chainId = useChainId();
  const config = useConfig();
  const { address, isConnected } = useAccount();

  const totalAmountNeed = useMemo(
    () => calculateTotal(amount),
    [amount]
  );

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  async function getApprovedAmount(
    tsenderAddress: string | undefined
  ): Promise<number> {
    if (!tsenderAddress || !address) return 0;

    try {
      const response = await readContract({
        ...config,
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, tsenderAddress as `0x${string}`],
      });

      return Number(response);
    } catch (error) {
      console.error("Allowance check failed:", error);
      return 0;
    }
  }

  async function handleSubmit() {
    if (!isConnected) {
      alert("Please connect your wallet.");
      return;
    }

    if (!tokenAddress || !recipientAddress || !amount) {
      alert("All fields are required.");
      return;
    }

    const tSenderAddress = chainsToTSender[chainId]?.tsender;

    if (!tSenderAddress) {
      alert("Unsupported chain.");
      return;
    }

    const approvedAmount = await getApprovedAmount(tSenderAddress);

    try {
      // STEP 1: Approve if needed
      if (approvedAmount < totalAmountNeed) {
        const approvalHash = await writeContractAsync({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [
            tSenderAddress as `0x${string}`,
            BigInt(totalAmountNeed),
          ],
        });

        const approvalReceipt = await waitForTransactionReceipt(
          config,
          { hash: approvalHash }
        );

        console.log("Approval confirmed:", approvalReceipt);
      }

      // STEP 2: Here you would call your TSender contract
      console.log("Ready to send:", {
        tokenAddress,
        recipientAddress,
        totalAmountNeed,
      });
    } catch (error) {
      console.error("Transaction failed:", error);
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
        disabled={isPending}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
      >
        {isPending ? "Processing..." : "Send Tokens"}
      </button>
    </div>
  );
}