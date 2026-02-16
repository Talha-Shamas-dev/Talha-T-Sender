 "use client";
import { useState, useMemo } from "react";
import InputField from "@/components/ui/InputField";
import { chainsToTSender, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { calculateTotal } from "@/utils/calculateTotal/calculateToal";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();

  const totalAmountNeed = useMemo(() => calculateTotal(amount), [amount]);

  async function getApprovedAmount(tsenderAddress: string | undefined): Promise<number> {
    if (!tsenderAddress) return 0;
    if (!account.address) return 0;

    try {
      const response = await readContract({
        ...config,
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        args: [account.address, tsenderAddress as `0x${string}`],
      });
      return Number(response);
    } catch {
      return 0;
    }
  }

  async function handleSubmit() {
    const tSenderAddress = chainsToTSender[chainId]?.tsender;
    if (!tSenderAddress) return alert("Unsupported chain.");
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    if (approvedAmount < totalAmountNeed) return alert("Not enough allowance.");

    console.log("Ready to send:", { tokenAddress, recipientAddress, totalAmountNeed });
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome</h2>
      <InputField label="Token Address" placeholder="0x1234...abcd" value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} />
      <InputField label="Recipient Address" placeholder="0x1234...abcd" value={recipientAddress} onChange={e => setRecipientAddress(e.target.value)} large />
      <InputField label="Amount" placeholder="100, 200, etc." value={amount} onChange={e => setAmount(e.target.value)} large />
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Send Tokens
      </button>
    </div>
  );
}