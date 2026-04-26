import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { erc20Abi, parseUnits } from "viem";
import type { Config } from "wagmi";
import { create } from "zustand";
import type { NoxQuote, NoxToken } from "@/lib/nox-types";
import {
  createNoxHandleClientFromWindow,
  encryptAmountWithHandle,
} from "@/lib/nox-handle";
import type { Chain, Token, VaultStrategy } from "@/types";

export type DepositStep =
  | "idle"
  | "quoting"
  | "ready"
  | "approving"
  | "wrapping"
  | "depositing"
  | "success"
  | "error";

const ERC7984_WRAPPER_ABI = [
  {
    name: "wrap",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "handle", type: "bytes32" },
      { name: "handleProof", type: "bytes" },
    ],
    outputs: [],
  },
] as const;

const CONFIDENTIAL_VAULT_ABI = [
  {
    name: "depositConfidential",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "handle", type: "bytes32" },
      { name: "handleProof", type: "bytes" },
    ],
    outputs: [],
  },
] as const;

type DepositState = {
  open: boolean;
  vault: VaultStrategy | null;
  token: Token | null;
  chain: Chain | null;
  amount: string;
  fromTokenAddress: string | null;
  fromTokenDecimals: number;
  quote: NoxQuote | null;
  step: DepositStep;
  error: string | null;
  txHash: string | null;
  openSheet: (args: {
    vault: VaultStrategy;
    token: Token;
    chain: Chain;
    amount: string;
  }) => void;
  closeSheet: () => void;
  reset: () => void;
  setAmount: (amount: string) => void;
  fetchQuote: (fromAddress: string, config: Config) => Promise<void>;
  setStep: (step: DepositStep) => void;
  setError: (error: string | null) => void;
  setTxHash: (txHash: string | null) => void;
  executeDeposit: (config: Config, account: `0x${string}`) => Promise<void>;
};

let quoteController: AbortController | null = null;

function friendlyError(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("user rejected")) return "Transaction rejected in wallet.";
  if (lower.includes("insufficient")) return "Insufficient balance.";
  return raw.length > 160 ? `${raw.slice(0, 160)}…` : raw;
}

export const useNoxDepositStore = create<DepositState>((set, get) => ({
  open: false,
  vault: null,
  token: null,
  chain: null,
  amount: "",
  fromTokenAddress: null,
  fromTokenDecimals: 6,
  quote: null,
  step: "idle",
  error: null,
  txHash: null,

  openSheet: ({ vault, token, chain, amount }) => {
    set({
      open: true,
      vault,
      token,
      chain,
      amount,
      fromTokenAddress: vault.tokenAddress,
      fromTokenDecimals: vault.tokenDecimals,
      quote: null,
      step: "idle",
      error: null,
      txHash: null,
    });
  },

  closeSheet: () => {
    if (quoteController) {
      quoteController.abort();
      quoteController = null;
    }
    set({ open: false });
  },

  reset: () =>
    set({
      open: false,
      vault: null,
      token: null,
      chain: null,
      amount: "",
      fromTokenAddress: null,
      fromTokenDecimals: 6,
      quote: null,
      step: "idle",
      error: null,
      txHash: null,
    }),

  setAmount: (amount) => set({ amount, quote: null, step: "idle", error: null }),

  fetchQuote: async (_fromAddress, _config) => {
    const { vault, token, chain, amount, fromTokenAddress } = get();
    if (!vault || !token || !chain || !fromTokenAddress) {
      set({ step: "error", error: "Missing deposit context" });
      return;
    }
    const trimmed = amount.trim();
    if (!trimmed || Number.parseFloat(trimmed) <= 0) {
      set({ step: "error", error: "Enter an amount to continue" });
      return;
    }
    set({ step: "ready", error: null });
  },

  executeDeposit: async (config, account) => {
    const { vault, chain, amount } = get();
    if (!vault || !chain) {
      set({ step: "error", error: "Missing deposit context" });
      return;
    }

    set({ step: "approving", error: null });

    try {
      const amountBigInt = parseUnits(amount, vault.tokenDecimals);
      const wrapperAddress = vault.tokenAddress as `0x${string}`;

      set({ step: "approving" });
      const approveHash = await writeContract(config, {
        address: wrapperAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [wrapperAddress, amountBigInt],
        chainId: chain.id,
      });
      await waitForTransactionReceipt(config, { hash: approveHash, chainId: chain.id });

      set({ step: "wrapping" });
      const handleClient = await createNoxHandleClientFromWindow(account);
      const { handle, handleProof } = await encryptAmountWithHandle(
        handleClient,
        amountBigInt,
        "uint256",
        wrapperAddress,
      );

      const wrapHash = await writeContract(config, {
        address: wrapperAddress,
        abi: ERC7984_WRAPPER_ABI,
        functionName: "wrap",
        args: [amountBigInt, handle as `0x${string}`, handleProof as `0x${string}`],
        chainId: chain.id,
      });
      await waitForTransactionReceipt(config, { hash: wrapHash, chainId: chain.id });

      set({ txHash: wrapHash, step: "success" });
    } catch (error) {
      const message = (error as Error).message || "Deposit failed";
      set({ step: "error", error: friendlyError(message) });
    }
  },

  setStep: (step) => set({ step }),
  setError: (error) => set({ error }),
  setTxHash: (txHash) => set({ txHash }),
}));