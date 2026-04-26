import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import type { Config } from "wagmi";
import { create } from "zustand";
import type { NoxPortfolio } from "@/lib/nox-types";
import {
  createNoxHandleClientFromWindow,
  encryptAmountWithHandle,
} from "@/lib/nox-handle";

export type WithdrawStep =
  | "idle"
  | "ready"
  | "unwrapping"
  | "success"
  | "error";

const ERC7984_UNWRAPPER_ABI = [
  {
    name: "unwrap",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "handle", type: "bytes32" },
      { name: "handleProof", type: "bytes" },
    ],
    outputs: [],
  },
  {
    name: "finalizeUnwrap",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "handle", type: "bytes32" },
    ],
    outputs: [],
  },
] as const;

type WithdrawState = {
  open: boolean;
  position: NoxPortfolio | null;
  percentage: number;
  step: WithdrawStep;
  error: string | null;
  txHash: string | null;
  openSheet: (position: NoxPortfolio) => void;
  closeSheet: () => void;
  setPercentage: (percentage: number) => void;
  executeWithdraw: (config: Config, account: `0x${string}`) => Promise<void>;
  setStep: (step: WithdrawStep) => void;
  setError: (error: string | null) => void;
  setTxHash: (txHash: string | null) => void;
};

function applyPercentage(balance: string, percentage: number): string {
  try {
    const balanceBigInt = BigInt(balance || "0");
    if (balanceBigInt === 0n) return "0";
    const pct = BigInt(Math.max(1, Math.min(100, percentage)));
    return ((balanceBigInt * pct) / 100n).toString();
  } catch {
    return "0";
  }
}

export const useNoxWithdrawStore = create<WithdrawState>((set, get) => ({
  open: false,
  position: null,
  percentage: 100,
  step: "idle",
  error: null,
  txHash: null,

  openSheet: (position) => {
    set({
      open: true,
      position,
      percentage: 100,
      step: "idle",
      error: null,
      txHash: null,
    });
  },

  closeSheet: () => set({ open: false }),

  setPercentage: (percentage) => set({ percentage, step: "idle", error: null }),

  executeWithdraw: async (config, account) => {
    const { position, percentage } = get();
    if (!position) {
      set({ step: "error", error: "No position selected" });
      return;
    }

    set({ step: "unwrapping", error: null });

    try {
      const shares = applyPercentage(position.balance, percentage);
      if (shares === "0") throw new Error("Nothing to withdraw.");

      const handleClient = await createNoxHandleClientFromWindow(account);
      const { handle, handleProof } = await encryptAmountWithHandle(
        handleClient,
        BigInt(shares),
        "uint256",
        position.vaultAddress as `0x${string}`,
      );

      const unwrapHash = await writeContract(config, {
        address: position.vaultAddress as `0x${string}`,
        abi: ERC7984_UNWRAPPER_ABI,
        functionName: "unwrap",
        args: [BigInt(shares), handle as `0x${string}`, handleProof as `0x${string}`],
        chainId: position.chainId,
      });
      await waitForTransactionReceipt(config, { hash: unwrapHash, chainId: position.chainId });

      const finalizeHash = await writeContract(config, {
        address: position.vaultAddress as `0x${string}`,
        abi: ERC7984_UNWRAPPER_ABI,
        functionName: "finalizeUnwrap",
        args: [handle as `0x${string}`],
        chainId: position.chainId,
      });

      set({ txHash: finalizeHash, step: "success" });
    } catch (error) {
      const raw = (error as Error).message || "Withdrawal failed";
      set({ step: "error", error: raw.length > 160 ? `${raw.slice(0, 160)}…` : raw });
    }
  },

  setStep: (step) => set({ step }),
  setError: (error) => set({ error }),
  setTxHash: (txHash) => set({ txHash }),
}));