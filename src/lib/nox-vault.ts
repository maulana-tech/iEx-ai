"use client";

import type {
  FetchVaultsParams,
  NoxToken,
  NoxVault,
  NoxVaultsResponse,
} from "./nox-types";
import { CONFIDENTIAL_TOKENS, SUPPORTED_NOX_CHAINS } from "./nox-types";

export type { NoxVault, NoxVaultsResponse, FetchVaultsParams };

const DEMO_VAULTS: NoxVault[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    chainId: 421614,
    name: "Confidential USDC Vault",
    protocol: "Nox Lending",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    description:
      "Earn yield on confidential USDC deposits with full privacy protection",
    underlyingToken: {
      address: "0xaf88d953a1d2d4008d5e6708b2e8d4c6c7b0a5f2",
      symbol: "cUSDC",
      name: "Confidential USDC",
      decimals: 6,
      priceUSD: "1",
      isConfidential: true,
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
    address: "0x2345678901234567890123456789012345678901",
    chainId: 421614,
    name: "Confidential WETH Vault",
    protocol: "Nox Lending",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/2518/small/weth.png",
    description: "Earn yield on confidential WETH with MEV protection",
    underlyingToken: {
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      symbol: "cWETH",
      name: "Confidential WETH",
      decimals: 18,
      priceUSD: "3500",
      isConfidential: true,
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
  {
    address: "0x3456789012345678901234567890123456789012",
    chainId: 421614,
    name: "High Yield Confidential USDC",
    protocol: "Nox Strategy",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    description:
      "Advanced yield strategy with confidential position protection",
    underlyingToken: {
      address: "0xaf88d953a1d2d4008d5e6708b2e8d4c6c7b0a5f2",
      symbol: "cUSDC",
      name: "Confidential USDC",
      decimals: 6,
      priceUSD: "1",
      isConfidential: true,
    },
    apy: {
      base: 6.8,
      reward: 2.5,
      total: 9.3,
    },
    apy1d: 9.5,
    apy7d: 9.0,
    apy30d: 8.5,
    tvl: {
      usd: "550000",
      native: "550000",
    },
    caps: {
      maxCap: "1000000",
    },
    isConfidential: true,
    riskTier: "medium",
    timeLock: 259200,
  },
  {
    address: "0x4567890123456789012345678901234567890123",
    chainId: 421614,
    name: "Confidential USDT Vault",
    protocol: "Nox Lending",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    description: "Earn yield on confidential USDT deposits",
    underlyingToken: {
      address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      symbol: "cUSDT",
      name: "Confidential USDT",
      decimals: 6,
      priceUSD: "1",
      isConfidential: true,
    },
    apy: {
      base: 4.2,
      reward: 0.5,
      total: 4.7,
    },
    apy1d: 4.8,
    apy7d: 4.5,
    apy30d: 4.3,
    tvl: {
      usd: "420000",
      native: "420000",
    },
    isConfidential: true,
    riskTier: "low",
    timeLock: 0,
  },
  {
    address: "0x5678901234567890123456789012345678901234",
    chainId: 421614,
    name: "Protected WBTC Vault",
    protocol: "Nox Strategy",
    protocolLogo:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
    description:
      "Earn yield on confidential WBTC with full MEV and copy-trade protection",
    underlyingToken: {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2B599",
      symbol: "cWBTC",
      name: "Confidential WBTC",
      decimals: 8,
      priceUSD: "95000",
      isConfidential: true,
    },
    apy: {
      base: 2.8,
      reward: 1.0,
      total: 3.8,
    },
    apy1d: 3.9,
    apy7d: 3.7,
    apy30d: 3.5,
    tvl: {
      usd: "310000",
      native: "3.26",
    },
    isConfidential: true,
    riskTier: "high",
    timeLock: 172800,
  },
];

export async function fetchVaultsViaProxy(
  params: FetchVaultsParams,
  signal?: AbortSignal,
): Promise<NoxVaultsResponse> {
  const url = new URL("/api/nox/vaults", window.location.origin);

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString(), {
    signal,
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`vaults_fetch_failed_${response.status}`);
  }

  return (await response.json()) as NoxVaultsResponse;
}

export function filterVaults(
  vaults: NoxVault[],
  params: FetchVaultsParams,
): NoxVault[] {
  let filtered = [...vaults];

  if (params.chainId) {
    filtered = filtered.filter((v) => v.chainId === params.chainId);
  }

  if (params.tokenAddress) {
    filtered = filtered.filter(
      (v) =>
        v.underlyingToken.address.toLowerCase() ===
        params.tokenAddress!.toLowerCase(),
    );
  }

  if (params.protocol) {
    filtered = filtered.filter(
      (v) => v.protocol.toLowerCase() === params.protocol!.toLowerCase(),
    );
  }

  if (params.minTvlUsd) {
    filtered = filtered.filter(
      (v) => parseFloat(v.tvl.usd) >= params.minTvlUsd!,
    );
  }

  return filtered;
}

export function sortVaults(
  vaults: NoxVault[],
  sortBy: "apy" | "tvl" = "apy",
): NoxVault[] {
  return [...vaults].sort((a, b) => {
    if (sortBy === "apy") {
      return b.apy.total - a.apy.total;
    }
    return parseFloat(b.tvl.usd) - parseFloat(a.tvl.usd);
  });
}

export function getRiskColor(riskTier?: "low" | "medium" | "high"): string {
  switch (riskTier) {
    case "low":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "high":
      return "text-red-500";
    default:
      return "text-muted";
  }
}

export function formatAPY(apy: number | null): string {
  if (apy === null) return "N/A";
  return `${apy.toFixed(2)}%`;
}

export function formatTVL(tvlUsd: string): string {
  const tvl = parseFloat(tvlUsd);
  if (tvl >= 1000000000) {
    return `$${(tvl / 1000000000).toFixed(1)}B`;
  }
  if (tvl >= 1000000) {
    return `$${(tvl / 1000000).toFixed(1)}M`;
  }
  if (tvl >= 1000) {
    return `$${(tvl / 1000).toFixed(1)}K`;
  }
  return `$${tvl.toFixed(0)}`;
}
