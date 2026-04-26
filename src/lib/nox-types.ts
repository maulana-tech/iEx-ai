import type { HandleClient } from "@iexec-nox/handle";

export type { HandleClient };

export type NoxVault = {
  address: string;
  chainId: number;
  name: string;
  protocol: string;
  protocolLogo?: string;
  description?: string;
  underlyingToken: NoxToken;
  apy: {
    base: number | null;
    reward: number | null;
    total: number;
  };
  apy1d?: number | null;
  apy7d?: number | null;
  apy30d?: number | null;
  tvl: {
    usd: string;
    native?: string;
  };
  caps?: {
    totalCap?: string;
    maxCap?: string;
  };
  timeLock?: number;
  isConfidential: true;
  riskTier?: "low" | "medium" | "high";
};

export type NoxToken = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  priceUSD?: string;
  isConfidential: boolean;
};

export type NoxChain = {
  id: number;
  name: string;
  shortName: string;
  logoURI?: string;
  rpcUrl?: string;
  explorerUrl?: string;
  isConfidentialSupported: boolean;
};

export type NoxVaultsResponse = {
  data: NoxVault[];
  nextCursor: string | null;
  total: number;
};

export type FetchVaultsParams = {
  chainId?: number;
  tokenAddress?: string;
  protocol?: string;
  minTvlUsd?: number;
  sortBy?: "apy" | "tvl";
  limit?: number;
  cursor?: string;
};

export type NoxQuote = {
  vaultAddress: string;
  tokenIn: NoxToken;
  tokenOut: NoxToken;
  amountIn: string;
  amountOut: string;
  estimatedYield: string;
  fee: string;
  steps: NoxQuoteStep[];
  isConfidential: true;
};

export type NoxQuoteStep = {
  type: "wrap" | "deposit" | "approve" | "unwrap" | "withdraw";
  token: NoxToken;
  amount: string;
  contractAddress?: string;
  spender?: string;
};

export type NoxPortfolio = {
  chainId: number;
  vaultAddress: string;
  vaultName: string;
  protocol: string;
  token: NoxToken;
  balance: string;
  balanceUSD: string;
  apy: number;
  isConfidential: true;
  decryptedBalance?: string;
};

export interface NoxHandleClient {
  client: HandleClient;
  encryptAmount: (
    amount: bigint,
    tokenType: string,
    contractAddress: string,
  ) => Promise<{
    handle: string;
    handleProof: string;
  }>;
  decryptBalance: (handle: string) => Promise<{
    value: bigint;
    decrypted: boolean;
  }>;
}

export const SUPPORTED_NOX_CHAINS: NoxChain[] = [
  {
    id: 421614,
    name: "Arbitrum Sepolia",
    shortName: "Arb Sepolia",
    isConfidentialSupported: true,
  },
  {
    id: 42161,
    name: "Arbitrum One",
    shortName: "Arbitrum",
    isConfidentialSupported: true,
  },
];

export const CONFIDENTIAL_TOKENS: Record<number, NoxToken[]> = {
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
      isConfidential: true,
    },
  ],
};

export function isConfidentialToken(symbol: string): boolean {
  return symbol.startsWith("c");
}

export function getRegularTokenSymbol(confidentialSymbol: string): string {
  return confidentialSymbol.replace("c", "");
}
