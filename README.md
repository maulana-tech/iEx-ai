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

**Supported Confidential Tokens:**

| Token | Wraps From | Standard |
|-------|-----------|----------|
| cUSDC | USDC | ERC-7984 |
| cUSDT | USDT | ERC-7984 |
| cWETH | WETH | ERC-7984 |

---

## Why iEx AI Exists

DeFi today is fully transparent. Every wallet's positions, deposit amounts, and yield strategies are publicly visible. This enables MEV front-running, copy-trading, and targeted attacks.

iEx AI solves this by leveraging Nox Protocol's confidential computing. Your deposits are encrypted at the token level — balances are hidden, strategies are private, and MEV bots can't see what you're doing.

Dani opens iEx AI, connects her wallet on Arbitrum, deposits 1000 USDC into a confidential vault. The USDC is wrapped to cUSDC (Confidential USDC), deposited privately, and starts earning yield — all in one click. Her balance? Hidden. Her strategy? Private. Her yield? Real.

---

## Key Features

| Feature | Description |
|---------|-------------|
| Confidential Vault Aggregator | Live-ranked vault routes with hidden balances |
| APY / TVL / Risk Filters | Filter vaults by yield, size, and risk tier |
| Privacy Badges | Each vault shows privacy level and confidential status |
| One-Click Deposit | Wrap → Approve → Deposit in a single flow |
| Confidential Portfolio | View positions with encrypted balance indicators |
| Withdraw Flow | One-click withdrawal from confidential vaults |
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

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
cp .env.example .env.local
# Fill in:
#   IEXEC_NOX_API_KEY — from iExec
#   IEXEC_NOX_SECRET_KEY — from iExec
#   PROJECT_ID — WalletConnect project ID
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
