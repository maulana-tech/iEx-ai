import { NextResponse } from "next/server";
import type { NoxPortfolio } from "@/lib/nox-types";
import { NOX_CONTRACTS } from "@/lib/nox-types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  const { address } = await params;

  if (!address || address === "undefined" || address === "null") {
    return NextResponse.json({ data: [], total: 0 });
  }

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
  if (!isValidAddress) {
    return NextResponse.json({ data: [], total: 0 });
  }

  const portfolio: NoxPortfolio[] = [
    {
      chainId: 421614,
      vaultAddress: NOX_CONTRACTS.cUSDC,
      vaultName: "Confidential USDC Vault",
      protocol: "Nox Protocol",
      token: {
        address: NOX_CONTRACTS.cUSDC,
        symbol: "cUSDC",
        name: "Confidential USDC",
        decimals: 6,
        logoURI:
          "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        priceUSD: "1",
        isConfidential: true,
      },
      balance: "0",
      balanceUSD: "0",
      apy: 5.7,
      isConfidential: true,
    },
    {
      chainId: 421614,
      vaultAddress: NOX_CONTRACTS.cRLC,
      vaultName: "Confidential RLC Vault",
      protocol: "Nox Protocol",
      token: {
        address: NOX_CONTRACTS.cRLC,
        symbol: "cRLC",
        name: "Confidential RLC",
        decimals: 9,
        logoURI: "https://assets.coingecko.com/coins/images/0/small/rlc.png",
        priceUSD: "3.5",
        isConfidential: true,
      },
      balance: "0",
      balanceUSD: "0",
      apy: 4.0,
      isConfidential: true,
    },
  ];

  return NextResponse.json({
    data: portfolio,
    total: portfolio.length,
  });
}