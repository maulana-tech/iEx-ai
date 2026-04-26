import { NextResponse } from "next/server";
import type { NoxQuote, NoxQuoteStep } from "@/lib/nox-types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const vaultAddress = searchParams.get("vaultAddress");
  const tokenIn = searchParams.get("tokenIn");
  const amountIn = searchParams.get("amountIn");
  const isWrapping = searchParams.get("isWrapping") === "true";

  if (!vaultAddress || !tokenIn || !amountIn) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  const _amountBigInt = BigInt(amountIn);

  const steps: NoxQuoteStep[] = [];

  if (isWrapping) {
    steps.push({
      type: "wrap",
      token: {
        address: tokenIn,
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        isConfidential: false,
      },
      amount: amountIn,
      contractAddress: "0xERC20ToERC7984Wrapper",
    });
  }

  steps.push({
    type: "approve",
    token: {
      address: tokenIn,
      symbol: isWrapping ? "USDC" : "cUSDC",
      name: isWrapping ? "USD Coin" : "Confidential USDC",
      decimals: 6,
      isConfidential: !isWrapping,
    },
    amount: amountIn,
    spender: vaultAddress,
  });

  steps.push({
    type: "deposit",
    token: {
      address: tokenIn,
      symbol: isWrapping ? "cUSDC" : "cUSDC",
      name: isWrapping ? "Confidential USDC" : "Confidential USDC",
      decimals: 6,
      isConfidential: true,
    },
    amount: amountIn,
    contractAddress: vaultAddress,
  });

  const quote: NoxQuote = {
    vaultAddress,
    tokenIn: {
      address: tokenIn,
      symbol: isWrapping ? "USDC" : "cUSDC",
      name: isWrapping ? "USD Coin" : "Confidential USDC",
      decimals: 6,
      isConfidential: !isWrapping,
    },
    tokenOut: {
      address: tokenIn,
      symbol: "cUSDC",
      name: "Confidential USDC",
      decimals: 6,
      isConfidential: true,
    },
    amountIn,
    amountOut: amountIn,
    estimatedYield: "5.7",
    fee: "0",
    steps,
    isConfidential: true,
  };

  return NextResponse.json(quote);
}
