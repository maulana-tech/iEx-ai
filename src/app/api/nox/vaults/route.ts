import { NextResponse } from "next/server";
import type { NoxVault } from "@/lib/nox-types";
import { NOX_CONTRACTS } from "@/lib/nox-types";

const VAULTS: NoxVault[] = [
  {
    address: NOX_CONTRACTS.cUSDC,
    chainId: 421614,
    name: "Confidential USDC Vault",
    protocol: "Nox Protocol",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    description:
      "Earn yield on confidential USDC deposits with full privacy protection. Balances and amounts are encrypted on-chain.",
    underlyingToken: {
      address: NOX_CONTRACTS.USDC,
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      logoURI:
        "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      priceUSD: "1",
      isConfidential: false,
    },
    apy: {
      base: 4.5,
      reward: 1.2,
      total: 5.7,
    },
    apy1d: 5.8,
    apy7d: 5.5,
    apy30d: 5.2,
    tvl: {
      usd: "1250000",
      native: "1250000",
    },
    isConfidential: true,
    riskTier: "low",
    timeLock: 0,
  },
  {
    address: NOX_CONTRACTS.cRLC,
    chainId: 421614,
    name: "Confidential RLC Vault",
    protocol: "Nox Protocol",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/0/small/rlc.png",
    description:
      "Earn yield on confidential RLC deposits. iExec's native token wrapped with ERC-7984 privacy.",
    underlyingToken: {
      address: NOX_CONTRACTS.RLC,
      symbol: "RLC",
      name: "iExec RLC",
      decimals: 9,
      logoURI:
        "https://assets.coingecko.com/coins/images/0/small/rlc.png",
      priceUSD: "3.5",
      isConfidential: false,
    },
    apy: {
      base: 3.2,
      reward: 0.8,
      total: 4.0,
    },
    apy1d: 4.1,
    apy7d: 3.9,
    apy30d: 3.7,
    tvl: {
      usd: "890000",
      native: "254",
    },
    isConfidential: true,
    riskTier: "medium",
    timeLock: 86400,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const chainId = searchParams.get("chainId");
  const tokenAddress = searchParams.get("tokenAddress");
  const protocol = searchParams.get("protocol");
  const minTvlUsd = searchParams.get("minTvlUsd");
  const sortBy = searchParams.get("sortBy") as "apy" | "tvl" | null;
  const limit = searchParams.get("limit");
  const _cursor = searchParams.get("cursor");

  let filtered = [...VAULTS];

  if (chainId) {
    filtered = filtered.filter((v) => v.chainId === parseInt(chainId, 10));
  }

  if (tokenAddress) {
    filtered = filtered.filter(
      (v) =>
        v.underlyingToken.address.toLowerCase() === tokenAddress.toLowerCase(),
    );
  }

  if (protocol) {
    filtered = filtered.filter(
      (v) => v.protocol.toLowerCase() === protocol.toLowerCase(),
    );
  }

  if (minTvlUsd) {
    filtered = filtered.filter(
      (v) => parseFloat(v.tvl.usd) >= parseFloat(minTvlUsd),
    );
  }

  if (sortBy === "apy") {
    filtered.sort((a, b) => b.apy.total - a.apy.total);
  } else if (sortBy === "tvl") {
    filtered.sort((a, b) => parseFloat(b.tvl.usd) - parseFloat(a.tvl.usd));
  }

  const limitNum = limit ? parseInt(limit, 10) : filtered.length;
  const vaultSlice = filtered.slice(0, limitNum);

  return NextResponse.json({
    data: vaultSlice,
    nextCursor: null,
    total: vaultSlice.length,
  });
}