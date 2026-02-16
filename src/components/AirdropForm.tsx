"use client";

import { useState, useMemo } from "react";
import InputField from "@/components/ui/InputField";
import { chainsToTSender, erc20Abi } from "@/constants";
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";
import {
  useAccount,
  useChainId,
  useReadContract,
  usePrepareTransactionRequest,
  useWriteContract,
} from "wagmi";
import type { Address } from "viem";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const chainId = useChainId();
  const { address, isConnected } = useAccount();

  const totalAmount = useMemo(() => BigInt(calculateTotal(amount) || 0), [amount]);
  const tSenderAddress = chainsToTSender[chainId ?? 1]?.tsender as Address | undefined;

  const isReady = isConnected && tokenAddress && tSenderAddress && totalAmount > 0n;

  /* =========================
     READ ALLOWANCE
  ========================== */
  const { data: allowance } = useReadContract({
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: "allowance",
    args: address && tSenderAddress ? [address, tSenderAddress] : undefined,
    enabled: Boolean(address && tokenAddress && tSenderAddress),
    watch: true,
  });

  const needsApproval = allowance !== undefined && (allowance as bigint) < totalAmount;

  /* =========================
     PREPARE APPROVE
  ========================== */
  const { config: approveConfig } = usePrepareTransactionRequest({
    to: tokenAddress as Address,
    data:
      tSenderAddress && tokenAddress
        ? erc20Abi.encodeFunctionData({
            name: "approve",
            args: [tSenderAddress, totalAmount],
          })
        : undefined,
    enabled: Boolean(isReady && needsApproval),
  });

  const { writeAsync: approveAsync, isLoading: isApproving } = useWriteContract(approveConfig);

  /* =========================
     HANDLE SUBMIT
  ========================== */
  const handleSubmit = async () => {
    if (!isConnected) return alert("Connect wallet first.");
    if (!tokenAddress || !recipientAddress || !amount) return alert("All fields are required.");
    if (!tSenderAddress) return alert("Unsupported network.");

    try {
      if (needsApproval && approveAsync) {
        await approveAsync();
        alert("Approval transaction sent!");
        return;
      }

      // TODO: implement TSender contract call here
      console.log("Ready to airdrop:", { tokenAddress, recipientAddress, totalAmount: totalAmount.toString() });
      alert("Airdrop logic ready (implement contract call).");
    } catch (err) {
      console.error(err);
      alert("Transaction failed, see console.");
    }
  };

  /* =========================
     UI
  ========================== */
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
        disabled={isApproving}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50"
      >
        {isApproving ? "Approving..." : "Send Tokens"}
      </button>
    </div>
  );
}