# iEx AI

**The Confidential Yield Aggregator powered by Nox Protocol.**
**Discover and deposit into confidential vaults across Arbitrum — one click, fully private.**

[![Built on Nox Protocol](https://img.shields.io/badge/Built%20on-Nox%20Protocol-836EF9)](https://docs.iex.ec/nox-protocol/getting-started/welcome)
[![Powered by ChainGPT](https://img.shields.io/badge/AI%20Powered-ChainGPT-000)](https://chaingpt.org)
[![iExec Hackathon](https://img.shields.io/badge/Hackathon-Vibe%20Coding-836EF9)](https://discord.gg/RXYHBJceMe)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

---

## What is iEx AI?

Yield farming lacks privacy. Every position, balance, and strategy is visible on-chain — exposed to MEV bots and copy-traders.

**iEx AI** is a confidential yield vault aggregator built on **Nox Protocol** (iExec) and **Confidential Tokens** (ERC-7984). It wraps your deposits into confidential tokens (cUSDC, cRLC), deposits them into ERC-4626 yield vaults, and tracks your positions — hiding your balances and strategies from the public chain.

Think: **yield aggregator meets confidential computing — Arbitrum-first.**

---

## Deployed Contracts (Arbitrum Sepolia — 421614)

### Confidential Tokens (ERC-7984)

| Contract | Address | Standard |
|----------|---------|----------|
| USDC | `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d` | ERC-20 |
| **cUSDC** | `0x1ccec6bc60db15e4055d43dc2531bb7d4e5b808e` | ERC-7984 |
| RLC | `0x9923eD3cbd90CD78b910c475f9A731A6e0b8C963` | ERC-20 |
| **cRLC** | `0x92b23f4a59175415ced5cb37e64a1fc6a9d79af4` | ERC-7984 |

### Yield Vaults (ERC-4626)

| Vault | Asset | Address |
|-------|-------|---------|
| Nox cUSDC Vault | cUSDC | `0x75ef70Ea33994a16751ff0b4f7DCF0F94DF1351F` |
| Nox cRLC Vault | cRLC | `0x1955eF9145cCAa643a8Ee61aE3206F0acb632Adf` |

---

## How It Works

### Deposit Flow (4 steps)

```
USDC → Approve cUSDC → Wrap to cUSDC (ERC-7984) → Approve Vault → Deposit to Vault
```

1. **Approve** — Allow cUSDC contract to spend your USDC
2. **Wrap** — Convert USDC to cUSDC (Confidential USDC via ERC-7984)
3. **Approve Vault** — Allow vault to accept your cUSDC
4. **Deposit** — Deposit cUSDC into the ERC-4626 yield vault, receive vault shares

### Withdraw Flow (2 steps)

```
Redeem vault shares → Unwrap cUSDC → USDC
```

1. **Redeem** — Burn vault shares, receive cUSDC from the vault
2. **Unwrap** — Convert cUSDC back to USDC

### Portfolio (on-chain)

All balances are read directly from the vault contracts on-chain — no mock data.

---

## Key Features

| Feature | Description |
|---------|-------------|
| Confidential Vault Aggregator | Browse live vaults with ERC-7984 confidential tokens |
| ERC-4626 Yield Vaults | Standard vault interface for deposit/withdraw/redeem |
| Real On-Chain Data | TVL and APY read from deployed vault contracts |
| Confidential Portfolio | View positions with encrypted balance indicators |
| ChainGPT AI | AI-powered vault recommendations and contract auditing |
| Arbitrum-Native | Default chain is Arbitrum Sepolia (421614) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Web3 | wagmi v2, viem, RainbowKit |
| State | Zustand |
| Confidential Computing | Nox Protocol (iExec) |
| Confidential Tokens | ERC-7984 (`@iexec-nox/handle`) |
| Yield Vaults | ERC-4626 (OpenZeppelin, deployed via Foundry) |
| AI | ChainGPT |

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
#   CHAINGPT_API_KEY — ChainGPT API key for AI features (optional)
#   NEXT_PUBLIC_APP_URL — your domain (http://localhost:3000 for local)
pnpm install
pnpm dev
```

Open [http://localhost:3000/earn](http://localhost:3000/earn) to start discovering confidential vaults.

### Smart Contracts

The vault contracts are in `foundry/` and deployed via Foundry:

```bash
# Compile
forge build

# Deploy
PRIVATE_KEY=0x... forge script foundry/DeployNoxVaults.s.sol:DeployNoxVaults \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc \
  --broadcast
```

---

## Project Structure

```
src/
├── app/
│   ├── (app)/earn/          # Vault discovery & deposit
│   ├── (app)/portfolio/     # Portfolio view
│   └── api/nox/             # Nox Protocol API proxies
├── lib/
│   ├── nox-types.ts         # Contract addresses & types
│   ├── nox-vault-contract.ts # Vault ABI
│   ├── nox-handle.ts        # Handle SDK wrapper
│   └── nox-{vault,meta,quote}.ts
├── stores/
│   ├── nox-deposit-store.ts  # Deposit flow (approve→wrap→deposit)
│   └── nox-withdraw-store.ts # Withdraw flow (redeem→unwrap)
└── types/

foundry/
├── NoxYieldVault.sol        # ERC-4626 vault contract
└── DeployNoxVaults.s.sol    # Deployment script
```

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

### On-Chain
- [cUSDC on Arbiscan](https://sepolia.arbiscan.io/address/0x1ccec6bc60db15e4055d43dc2531bb7d4e5b808e)
- [cRLC on Arbiscan](https://sepolia.arbiscan.io/address/0x92b23f4a59175415ced5cb37e64a1fc6a9d79af4)
- [cUSDC Vault on Arbiscan](https://sepolia.arbiscan.io/address/0x75ef70Ea33994a16751ff0b4f7DCF0F94DF1351F)
- [cRLC Vault on Arbiscan](https://sepolia.arbiscan.io/address/0x1955eF9145cCAa643a8Ee61aE3206F0acb632Adf)
