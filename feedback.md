# iExec Nox Protocol & Confidential Token - Feedback

## Project: iEx AI - Confidential Yield Vaults

### Overall Experience

Building with Nox Protocol was straightforward once we understood the architecture. The concept of confidential tokens (ERC-7984) wrapping regular ERC-20s is elegant and fits naturally into our yield aggregator use case.

### What Worked Well

- **JS SDK (`@iexec-nox/handle`)**: Easy to integrate with viem. The `encryptInput` and `decrypt` functions are intuitive. Creating a HandleClient with `createViemHandleClient` worked seamlessly.
- **ERC-7984 Standard**: The confidential token standard is well-designed. Wrapping ERC-20 → cToken is a clean abstraction that preserves DeFi composability.
- **Documentation**: The docs at docs.iex.ec were helpful for getting started. The JS SDK getting started guide was clear.
- **ChainGPT Integration**: The AI assistant added value for smart contract auditing and vault strategy recommendations.

### Challenges & Suggestions

1. **npm Package Discovery**: It took some effort to find all available packages under `@iexec-nox/`. A clearer package registry or summary would help.
2. **Demo Vault Data**: For the hackathon, we needed to create mock vault data since there aren't many live confidential vaults yet on Arbitrum Sepolia. Having a faucet or demo vault registry would accelerate development.
3. **Error Messages**: Some SDK errors were generic. More descriptive error messages (e.g., "handle expired", "ACL denied") would improve debugging.
4. **TypeScript Types**: The SDK types could be more specific for `encryptInput` - the `SolidityType` parameter could be better documented with available values.
5. **Gas Costs**: TEE computation adds gas overhead. Documentation on expected gas costs for common operations would help with UX planning.

### What We Built

- A yield vault aggregator with confidential tokens
- Privacy-protected deposits (balances hidden, MEV protected)
- One-click wrap + deposit flow (ERC-20 → cToken → Vault)
- ChainGPT-powered vault recommendations
- Deployed on Arbitrum Sepolia

### Rating

- Ease of integration: 8/10
- Documentation quality: 7/10
- SDK developer experience: 8/10
- Overall satisfaction: 8/10

### Would Use Again?

Yes. The Nox Protocol provides a unique value proposition for DeFi privacy. The ERC-7984 standard is well thought out and the SDK is developer-friendly. We look forward to more confidential vaults being deployed.
