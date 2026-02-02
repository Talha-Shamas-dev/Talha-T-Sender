"use client"

import { useState } from "react";
import InputField from "@/components/ui/InputField"
import { chainsToTSender,tsenderAbi,erc20Abi } from "@/constants"
import { useChainId, useConfig, useAccount } from "wagmi";
import { form } from "viem/chains";
import { readContract } from "@wagmi/core";
export default function AirdropForm() 
{
  
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  async function getApprovedAmount(tsenderAddress: string | null):Promise<number> 
{
  if (!tsenderAddress) {
    alert("NO address found , olease use a supported chain")
    return 0;}
    const response = await readContract(config, {
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName:"allowance",
      args:[account.address, tsenderAddress as `0x${string}`],
    });
    return Number(response);
}
  async function handlesubmit() {
    // Handle form submission logic here
   const tSenderAddress = chainsToTSender[chainId]["tsender"]
   const approvedAmount = await getApprovedAmount(tSenderAddress)
   console.log(approvedAmount)
   

  // Example for Sepolia
  }

  return(
    <div>
      <InputField label="Token Address" placeholder="0x1234...abcd" 
      value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value) 
      } />
       <InputField label="Recipient Address" placeholder="0x1234...abcd" 
      value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)
      }
      large={true} />
       <InputField label="Token Address" placeholder="0x1234...abcd" 
      value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value) 
      } />
       <InputField label="Amount" placeholder="100, 200, etc." 
      value={amount} onChange={(e) => setAmount(e.target.value)}
      large={true}
      />
      <button onClick={handlesubmit}>
        send Tokens
      </button>
    </div>

  );
}
