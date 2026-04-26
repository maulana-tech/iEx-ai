import { NextResponse } from "next/server";
import type { NoxChain, NoxToken } from "@/lib/nox-types";

const SUPPORTED_CHAINS: NoxChain[] = [
  {
    id: 421614,
    name: "Arbitrum Sepolia",
    shortName: "Arb Sepolia",
    logoURI:
      "https://assets.coingecko.com/coins/images/16547/small/photo_2023-05-30_21-47-00.jpg",
    rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    explorerUrl: "https://sepolia.arbiscan.io",
    isConfidentialSupported: true,
  },
  {
    id: 42161,
    name: "Arbitrum One",
    shortName: "Arbitrum",
    logoURI:
      "https://assets.coingecko.com/coins/images/16547/small/photo_2023-05-30_21-47-00.jpg",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorerUrl: "https://arbiscan.io",
    isConfidentialSupported: true,
  },
];

const CONFIDENTIAL_TOKENS: Record<number, NoxToken[]> = {
  421614: [
    {
      address: "0xaf88d953a1d2d4008d5e6708b2e8d4c6c7b0a5f2",
      symbol: "cUSDC",
      name: "Confidential USDC",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      priceUSD: "1",
      isConfidential: true,
    },
    {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      symbol: "cUSDT",
      name: "Confidential USDT",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      priceUSD: "1",
      isConfidential: true,
    },
    {
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      symbol: "cWETH",
      name: "Confidential WETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      priceUSD: "3500",
      isConfidential: true,
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2B599",
      symbol: "cWBTC",
      name: "Confidential WBTC",
      decimals: 8,
      logoURI:
        "https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2b599.png",
      priceUSD: "95000",
      isConfidential: true,
    },
  ],
  42161: [
    {
      address: "0xaf88d953a1d2d4008d5e6708b2e8d4c6c7b0a5f2",
      symbol: "cUSDC",
      name: "Confidential USDC",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      priceUSD: "1",
      isConfidential: true,
    },
    {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      symbol: "cUSDT",
      name: "Confidential USDT",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      priceUSD: "1",
      isConfidential: true,
    },
    {
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      symbol: "cWETH",
      name: "Confidential WETH",
      decimals: 18,
      logoURI:
        "https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
      priceUSD: "3500",
      isConfidential: true,
    },
  ],
};

export async function GET() {
  return NextResponse.json({
    chains: SUPPORTED_CHAINS,
    tokens: CONFIDENTIAL_TOKENS,
  });
}
