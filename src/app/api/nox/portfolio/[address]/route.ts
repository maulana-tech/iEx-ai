import { NextResponse } from "next/server";
import type { NoxPortfolio } from "@/lib/nox-types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> },
) {
  const { address } = await params;

  if (!address || address === "undefined" || address === "null") {
    return NextResponse.json({ data: [], total: 0 });
  }

  const mockPortfolio: NoxPortfolio[] = [
    {
      chainId: 421614,
      vaultAddress: "0x1234567890123456789012345678901234567890",
      vaultName: "Confidential USDC Vault",
      protocol: "Nox Lending",
      token: {
        address: "0xaf88d953a1d2d4008d5e6708b2e8d4c6c7b0a5f2",
        symbol: "cUSDC",
        name: "Confidential USDC",
        decimals: 6,
        priceUSD: "1",
        isConfidential: true,
      },
      balance: "1000000000",
      balanceUSD: "1000",
      apy: 5.7,
      isConfidential: true,
    },
    {
      chainId: 421614,
      vaultAddress: "0x2345678901234567890123456789012345678901",
      vaultName: "Confidential WETH Vault",
      protocol: "Nox Lending",
      token: {
        address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        symbol: "cWETH",
        name: "Confidential WETH",
        decimals: 18,
        priceUSD: "3500",
        isConfidential: true,
      },
      balance: "1000000000000000000",
      balanceUSD: "3500",
      apy: 4.0,
      isConfidential: true,
    },
  ];

  return NextResponse.json({
    data: mockPortfolio,
    total: mockPortfolio.length,
  });
}
