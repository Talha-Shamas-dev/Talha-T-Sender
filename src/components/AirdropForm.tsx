"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/ui/InputField";
import { chainsToTSender, erc20Abi } from "@/constants";
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import { useAccount, useChainId, useConfig } from "wagmi";
import { readContract, prepareTransactionRequest, sendTransaction } from "wagmi/actions";
import { type Address, type Abi, encodeFunctionData } from "viem";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const config = useConfig(); // get the wagmi config

  const totalAmount = useMemo(() => BigInt(calculateTotal(amount) || 0), [amount]);
  const tSenderAddress = chainsToTSender[chainId ?? 1]?.tsender as Address | undefined;

  const handleSubmit = async () => {
    if (!isConnected) return alert("Connect your wallet first.");
    if (!tokenAddress || !recipientAddress || !amount) return alert("All fields are required.");
    if (!tSenderAddress) return alert("Unsupported network.");
    if (totalAmount <= 0n) return alert("Enter a valid amount.");

    setIsProcessing(true);

    try {
      // Read allowance using wagmi/actions with config first
      const allowance = await readContract(config, {
        abi: erc20Abi as Abi,
        address: tokenAddress as Address,
        functionName: "allowance",
        args: [address as Address, tSenderAddress as Address],
      }) as bigint;

      if (allowance < totalAmount) {
        // Encode approve function data
        const data = encodeFunctionData({
          abi: erc20Abi as Abi,
          functionName: "approve",
          args: [tSenderAddress, totalAmount],
        });

        const txRequest = await prepareTransactionRequest(config, {
          to: tokenAddress as Address,
          data,
          chainId,
        });

        await sendTransaction(config, txRequest);
        alert("Approval sent! Confirm in your wallet.");
        setIsProcessing(false);
        return;
      }

      console.log("Ready to send tokens:", {
        tokenAddress,
        recipientAddress,
        totalAmount: totalAmount.toString(),
      });
      alert("Airdrop logic ready! Check console for details.");
    } catch (err) {
      console.error("Transaction failed:", err);
      alert("Transaction failed! See console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Token Airdrop</h2>

      <InputField
        label="Token Address"
        placeholder="0x..."
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />

      <InputField
        label="Recipient Address"
        placeholder="0x..."
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />

      <InputField
        label="Amount"
        placeholder="100"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Send Tokens"}
      </button>
    </div>
  );
}