# iEx AI — Confidential Yield Vault Aggregator

[![Built on Nox Protocol](https://img.shields.io/badge/Built%20on-Nox%20Protocol-836EF9)](https://docs.iex.ec/nox-protocol/getting-started/welcome)
[![ERC-7984](https://img.shields.io/badge/Standard-ERC--7984-836EF9)](https://docs.iex.ec/nox-protocol/getting-started/welcome)
[![Powered by ChainGPT](https://img.shields.io/badge/AI%20Powered-ChainGPT-000)](https://chaingpt.org)
[![iExec Hackathon](https://img.shields.io/badge/Track-Confidential%20DeFi%20%26%20RWA-836EF9)](https://discord.gg/RXYHBJceMe)
[![Arbitrum Sepolia](https://img.shields.io/badge/Network-Arbitrum%20Sepolia-2D3748)](https://sepolia.arbiscan.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**Live App:** [https://iex-ai.vercel.app](https://iex-ai.vercel.app)

---

## Problem

Yield farming lacks privacy. Every position, balance, and strategy is visible on-chain — exposed to MEV bots, copy-traders, and on-chain analytics. There is no way to earn yield while keeping your financial positions confidential.

## Solution

**iEx AI** is a confidential yield vault aggregator built on **Nox Protocol** (iExec) using **TEE-based confidential tokens** (ERC-7984). It wraps user deposits into confidential tokens (cUSDC, cRLC), deposits them into ERC-4626 yield vaults, and tracks positions — all with balances hidden from the public chain via TEE encryption.

> **Yield aggregator meets confidential computing — Arbitrum-first.**

## How It Works

```
DEPOSIT:  USDC → Wrap (ERC-7984 TEE encryption) → cUSDC → Deposit to Vault → Vault Shares
WITHDRAW: Vault Shares → Redeem from Vault → cUSDC → Unwrap (TEE decryption) → USDC
PORTFOLIO: vault.balanceOf(user) → on-chain read → display (balances remain encrypted)
```

All amounts are encrypted inside TEE handles before hitting the blockchain. Only authorized parties (via ACL) can decrypt. Standard ERC-20 interface (`transfer`, `approve`, `balanceOf`) is preserved for DeFi composability.

## Deployed Contracts (Arbitrum Sepolia — 421614)

### Confidential Tokens (ERC-7984 — Nox Protocol TEE)

| Token | Address | Standard |
|-------|---------|----------|
| USDC | `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d` | ERC-20 |
| **cUSDC** | `0x1ccec6bc60db15e4055d43dc2531bb7d4e5b808e` | ERC-7984 (TEE) |
| RLC | `0x9923eD3cbd90CD78b910c475f9A731A6e0b8C963` | ERC-20 |
| **cRLC** | `0x92b23f4a59175415ced5cb37e64a1fc6a9d79af4` | ERC-7984 (TEE) |

### Yield Vaults (ERC-4626 — Custom, deployed via Foundry)

| Vault | Asset | Address |
|-------|-------|---------|
| Nox cUSDC Vault | cUSDC | `0x75ef70Ea33994a16751ff0b4f7DCF0F94DF1351F` |
| Nox cRLC Vault | cRLC | `0x1955eF9145cCAa643a8Ee61aE3206F0acb632Adf |

### Arbiscan Links

- [cUSDC](https://sepolia.arbiscan.io/address/0x1ccec6bc60db15e4055d43dc2531bb7d4e5b808e) | [cRLC](https://sepolia.arbiscan.io/address/0x92b23f4a59175415ced5cb37e64a1fc6a9d79af4)
- [cUSDC Vault](https://sepolia.arbiscan.io/address/0x75ef70Ea33994a16751ff0b4f7DCF0F94DF1351F) | [cRLC Vault](https://sepolia.arbiscan.io/address/0x1955eF9145cCAa643a8Ee61aE3206F0acb632Adf)

## Features

| Feature | Description |
|---------|-------------|
| Confidential Vault Aggregator | Browse and deposit into vaults with ERC-7984 confidential tokens |
| TEE-Based Encryption | Nox Protocol TEE handles wrap/unwrap — amounts encrypted before on-chain storage |
| ERC-4626 Yield Vaults | Standard vault interface (deposit/withdraw/redeem) for composability |
| Real On-Chain Data | TVL, APY, and balances read directly from deployed contracts — zero mock data |
| Confidential Portfolio | View positions with encrypted balance indicators |
| AI Assistant (ChainGPT) | Built-in chat for vault recommendations, strategy advice, and contract auditing |
| Dark/Light Theme | Full theme support with glassmorphism UI |
| Multi-Chain Earn | LI.FI integration for general yield opportunities across chains |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Web3 | wagmi v2, viem, RainbowKit |
| State | Zustand |
| Confidential Computing | **Nox Protocol (iExec) — TEE-based** |
| Confidential Tokens | **ERC-7984 via `@iexec-nox/handle` SDK** |
| Yield Vaults | ERC-4626 (OpenZeppelin v5, deployed via Foundry) |
| AI | ChainGPT |
| Animation | Framer Motion |

## Nox Protocol Integration (TEE, not FHE)

We use the **Nox Protocol TEE-based** implementation of ERC-7984 — not the Zama/FHE version.

**Dependencies:**
- `@iexec-nox/handle` — Handle SDK for TEE encryption/decryption
- `@iexec-nox/nox-protocol-contracts` — Nox Protocol on-chain contracts
- `@iexec-nox/nox-confidential-contracts` — Confidential token contracts

**TEE Flow:**
- `wrap(amount)` → encrypts amount into a TEE handle → stores handle on-chain
- `unwrap(handle, handleProof)` → TEE verifies proof → decrypts amount → transfers back
- ACL managed through Nox Protocol's TEE infrastructure
- Zero `@zama`, `fhe`, or `tfhe` dependencies

## Setup

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Required env vars: `PROJECT_ID` (WalletConnect). Optional: `CHAINGPT_API_KEY`.

## Smart Contracts

```bash
cd foundry
forge build

PRIVATE_KEY=0x... forge script DeployNoxVaults.s.sol:DeployNoxVaults \
  --rpc-url https://sepolia-rollup.arbitrum.io/rpc \
  --broadcast
```

## Project Structure

```
src/
├── app/(app)/earn/            # Vault discovery & deposit
├── app/(app)/portfolio/       # Confidential portfolio
├── app/(app)/compare/         # Vault comparison
├── app/api/nox/               # Nox Protocol API proxies (on-chain reads)
├── components/ui/ai-chat/      # ChainGPT AI assistant
├── lib/
│   ├── nox-handle.ts          # TEE Handle SDK wrapper
│   ├── nox-vault-contract.ts  # ERC-4626 vault ABI
│   └── nox-types.ts           # Contract addresses & types
└── stores/
    ├── nox-deposit-store.ts   # 4-step deposit flow
    └── nox-withdraw-store.ts  # Withdraw flow

foundry/
├── NoxYieldVault.sol          # ERC-4626 vault contract
└── DeployNoxVaults.s.sol      # Deployment script
```

## Resources

- [Nox Protocol Docs](https://docs.iex.ec/nox-protocol/getting-started/welcome)
- [Confidential Token Demo](https://cdefi.iex.ec/)
- [Nox npm Packages](https://www.npmjs.com/org/iexec-nox)
- [ChainGPT](https://chaingpt.org)
- [iExec Discord](https://discord.gg/RXYHBJceMe)

## License

MIT
