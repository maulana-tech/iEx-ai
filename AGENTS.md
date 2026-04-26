<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

- **Root is the Next.js app** — no `frontend/` subdirectory. `package.json` lives at `/`.
- **Path alias**: `@/*` maps to `./src/*` (not `./frontend/src/*`).
- `pnpm-workspace.yaml` does not define workspace packages — it's only used for built dependency config.

## Setup & Dev

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```
Required env vars: `PROJECT_ID` (WalletConnect), `NEXT_PUBLIC_APP_URL`, `IEXEC_NOX_API_KEY`, `IEXEC_NOX_SECRET_KEY`.

## Lint & Format

- **Biome** (not ESLint/Prettier)
- `pnpm lint` — check only (no auto-fix)
- `pnpm format` — write changes
- Config: `biome.json` (Next.js + React domain rules enabled)

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + React Compiler (`babel-plugin-react-compiler`)
- Tailwind CSS 4 + PostCSS
- wagmi v2, viem, RainbowKit
- Zustand for state
- **Nox Protocol** (iExec confidential computing) + **ChainGPT** (AI)

## Key Architecture

- **No longer uses LI.FI** — migrated to Nox Protocol
- Nox proxies at `src/app/api/nox/{vaults,quote,meta,portfolio}/`
- Nox lib files: `src/lib/nox-vault.ts`, `src/lib/nox-meta.ts`, `src/lib/nox-quote.ts`, `src/lib/nox-handle.ts`
- Confidential stores: `src/stores/nox-deposit-store.ts`, `src/stores/nox-withdraw-store.ts`
- App pages under `src/app/(app)/`
- Default chain: **Arbitrum Sepolia (421614)** — NOT Monad
- Confidential tokens: cUSDC, cUSDT, cWETH (ERC-7984)