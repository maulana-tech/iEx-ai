# iEx AI

**The Confidential Yield Aggregator powered by Nox Protocol.**
**Discover and deposit into confidential vaults across Arbitrum — one click, fully private.**

[![Built on Nox Protocol](https://img.shields.io/badge/Built%20on-Nox%20Protocol-836EF9)](https://docs.iex.ec/nox-protocol/getting-started/welcome)
[![Powered by ChainGPT](https://img.shields.io/badge/AI%20Powered-ChainGPT-000)](https://chaingpt.org)
[![iExec Hackathon](https://img.shields.io/badge/Hackathon-Vibe%20Coding-836EF9)](https://discord.gg/RXYHBJceMe)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

</div>

---

## What is iEx AI?

Yield farming lacks privacy. Every position, balance, and strategy is visible on-chain — exposed to MEV bots and copy-traders.

**iEx AI** is a confidential yield vault aggregator built on **Nox Protocol** (iExec) and **Confidential Tokens** (ERC-7984). It wraps your deposits into confidential tokens (cUSDC, cWETH, etc.) and deposits into privacy-protected vaults — hiding your balances and strategies from the public chain. One-click deposit handles the wrap + deposit in a single signed transaction.

Think: **yield aggregator meets confidential computing — Arbitrum-first.**

---

## Built on Nox Protocol

iEx AI is built on the **Nox Protocol** — a confidential computing layer that enables computations on encrypted data via Trusted Execution Environments (TEEs). Every deposit is wrapped into a Confidential Token (ERC-7984) that keeps balances and transaction amounts hidden.

| Nox Feature | What It Does |
|--------------------------|--------------|
| **Confidential Tokens (ERC-7984)** | Wraps ERC-20 into confidential equivalents with hidden balances |
| **TEE-Verified Privacy** | All computations run inside hardware-protected environments |
| **Full DeFi Composability** | Confidential tokens work with existing DeFi protocols |
| **JS SDK** | Encrypt inputs and decrypt results with `@iexec-nox/handle` |
| **ChainGPT Integration** | AI-powered vault recommendations and contract auditing |

**Confidential Tokens on Arbitrum Sepolia:**

| Token | Wraps From | Standard | Contract |
|-------|-----------|----------|----------|
| cUSDC | USDC | ERC-7984 | `0x1ccec6bc...` |
| cRLC | RLC | ERC-7984 | `0x92b23f4a...` |

> Only cUSDC and cRLC are currently deployed on Arbitrum Sepolia testnet.
> Source: [iExec-Nox/demo-ctoken](https://github.com/iExec-Nox/demo-ctoken)

---

## Why iEx AI Exists

DeFi today is fully transparent. Every wallet's positions, deposit amounts, and yield strategies are publicly visible. This enables MEV front-running, copy-trading, and targeted attacks.

iEx AI solves this by leveraging Nox Protocol's confidential computing. Your deposits are encrypted at the token level — balances are hidden, strategies are private, and MEV bots can't see what you're doing.

Dani opens iEx AI, connects her wallet on Arbitrum Sepolia, deposits 1000 USDC into the Confidential USDC vault. The USDC is wrapped to cUSDC (Confidential USDC via ERC-7984), deposited privately, and starts earning yield — all in one click. Her balance? Hidden. Her strategy? Private. Her yield? Real.

---

## Key Features

| Feature | Description |
|---------|-------------|
| Confidential Vault Aggregator | Browse live vaults with ERC-7984 confidential tokens on Arbitrum Sepolia |
| APY / TVL / Risk Filters | Filter vaults by yield, size, and risk tier |
| Privacy Badges | Each vault shows CONFIDENTIAL status via ERC-7984 |
| One-Click Wrap Deposit | Approve ERC-20 → wrap to cToken via ERC-7984 contract |
| Confidential Portfolio | View positions with encrypted balance indicators |
| Withdraw Flow | Unwrap cToken back to underlying ERC-20 |
| ChainGPT AI | AI-powered vault recommendations and contract auditing |
| Share Card | Share your earn positions (public side only) |
| Arbitrum-Native | Default chain is Arbitrum Sepolia (421614) |

---

## Supported Chains

Arbitrum is the **default and primary** network.

| # | Chain | Chain ID | Role | Status |
|---|-------|----------|------|--------|
| 1 | **Arbitrum Sepolia** | **421614** | **Primary (default)** | Live |
| 2 | **Arbitrum One** | **42161** | Mainnet | Supported |

---

## System Architecture

```
User selects token + amount
        |
        v
  Nox Protocol (TEE)
  Encrypt deposit amount
        |
        v
  Confidential Vault Aggregator
  Filter by APY, TVL, risk, privacy
        |
        v
  User selects vault → Strategy Review
  APY, TVL, risk tier, privacy level
        |
        v
  Wrap ERC-20 → Confidential Token (ERC-7984)
        |
        v
  One-click deposit
  Single signed transaction via wallet
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Motion (framer-motion) |
| Web3 | wagmi v2, viem, RainbowKit |
| State | Zustand |
| Confidential Computing | Nox Protocol (iExec) |
| Confidential Tokens | ERC-7984 (@iexec-nox/handle) |
| AI | ChainGPT |
| Icons | react-icons |

---

## ERC-7984 Implementation

This section documents the full ERC-7984 implementation as required by the challenge criteria.

### Deployed Contracts (Arbitrum Sepolia)

| Contract | Address | Standard |
|----------|---------|----------|
| USDC (ERC-20) | `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d` | ERC-20 |
| **cUSDC** (ERC-7984) | `0x1ccec6bc60db15e4055d43dc2531bb7d4e5b808e` | ERC-7984 |
| RLC (ERC-20) | `0x9923eD3cbd90CD78b910c475f9A731A6e0b8C963` | ERC-20 |
| **cRLC** (ERC-7984) | `0x92b23f4a59175415ced5cb37e64a1fc6a9d79af4` | ERC-7984 |
| NoxCompute (TEE Gateway) | `0xd464B198f06756a1d00be223634b85E0a731c229` | Protocol |

Source: [iExec-Nox/demo-ctoken](https://github.com/iExec-Nox/demo-ctoken/blob/main/lib/contracts.ts)

### ERC-7984 Interface (Solidity)

Full interface implemented per ERC-7984 spec:

```solidity
// Wrap: lock ERC-20 → mint cToken (cleartext amount, no encryption needed)
function wrap(address to, uint256 amount) external returns (bytes32 handle);

// Unwrap step 1: initiate unwrap (requires encrypted handle + proof)
function unwrap(
    address from,
    address to,
    bytes32 encryptedAmount,
    bytes inputProof
) external returns (bytes32);

// Unwrap step 2: finalize (TEE verifies decryption, transfers underlying ERC-20)
function finalizeUnwrap(bytes32 unwrapAmount, bytes decryptionProof) external;

// Confidential transfer (encrypted amount + proof required)
function confidentialTransfer(
    address to,
    bytes32 encryptedAmount,
    bytes inputProof
) external;

// Balance queries return bytes32 handles (must decrypt client-side via Nox SDK)
function confidentialBalanceOf(address account) external view returns (bytes32);
function confidentialTotalSupply() external view returns (bytes32);
```

### JavaScript SDK Integration

Using `@iexec-nox/handle` for client-side encryption/decryption:

```typescript
import { createViemHandleClient } from "@iexec-nox/handle";

// Create client from wallet
const handleClient = await createViemHandleClient(walletClient);

// Encrypt amount for unwrap/transfer operations
const { handle, handleProof } = await handleClient.encryptInput(
  1000n,           // amount
  "uint256",       // SolidityType
  cUSDCAddress     // target contract (must be allowed to use encrypted value)
);

// Decrypt balance handle returned by confidentialBalanceOf()
const { value } = await handleClient.decrypt(balanceHandle);
```

### Deposit Flow (Approve → Wrap)

```typescript
// 1. Approve cUSDC contract to spend underlying USDC
await writeContract(config, {
  address: usdcAddress,
  abi: erc20Abi,
  functionName: "approve",
  args: [cUSDCAddress, amount],
});

// 2. Wrap USDC → cUSDC (cleartext amount, returns encrypted handle)
const wrapTx = await writeContract(config, {
  address: cUSDCAddress,
  abi: ERC7984_WRAPPER_ABI,
  functionName: "wrap",
  args: [account, amount],  // address to, uint256 amount
});
```

### Withdraw Flow (Unwrap → Finalize)

```typescript
// 1. Encrypt withdrawal amount
const { handle, handleProof } = await handleClient.encryptInput(
  amount, "uint256", cUSDCAddress
);

// 2. Initiate unwrap (creates encrypted unwrap request)
const unwrapTx = await writeContract(config, {
  address: cUSDCAddress,
  abi: ERC7984_UNWRAPPER_ABI,
  functionName: "unwrap",
  args: [account, account, handle, handleProof],
});

// 3. Finalize (TEE verifies proof, transfers USDC to recipient)
const finalizeTx = await writeContract(config, {
  address: cUSDCAddress,
  abi: ERC7984_UNWRAPPER_ABI,
  functionName: "finalizeUnwrap",
  args: [unwrapHandle],
});
```

### Privacy Properties

| Property | How It Works |
|----------|-------------|
| Hidden balances | `confidentialBalanceOf` returns encrypted handle, not plaintext value |
| Hidden amounts | All transfers use `encryptedAmount` handle, not visible number |
| Selective disclosure | ACL system allows granting view access to specific addresses |
| MEV protection | Amounts hidden at smart contract level, MEV bots see only encrypted handles |
| TEE verification | All decryption/verification runs in Intel TDX enclaves |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
cp .env.example .env.local
# Fill in:
#   PROJECT_ID — WalletConnect project ID (required)
#   CHAINGPT_API_KEY — ChainGPT API key for AI features (optional, contact @vladnazarxyz for free credits)
#   NEXT_PUBLIC_APP_URL — your domain (http://localhost:3000 for local)
pnpm install
pnpm dev
```

Open [http://localhost:3000/earn](http://localhost:3000/earn) to start discovering confidential vaults.

---

## Resources

### iExec & Nox Protocol
- [Nox Protocol Docs](https://docs.iex.ec/nox-protocol/getting-started/welcome)
- [Confidential Token Demo](https://cdefi.iex.ec/)
- [Nox npm Packages](https://www.npmjs.com/org/iexec-nox)
- [iExec Discord](https://discord.gg/RXYHBJceMe)

### ChainGPT
- [ChainGPT Platform](https://chaingpt.org)
- [ChainGPT API Docs](https://docs.chaingpt.org)
