const CHAINGPT_API_BASE = "https://api.chaingpt.org";

type ChainGPTChatResponse = {
  text: string;
};

export async function chatWithChainGPT(
  prompt: string,
  apiKey?: string,
  signal?: AbortSignal,
): Promise<string> {
  const key = apiKey || process.env.CHAINGPT_API_KEY;
  if (!key) {
    return "ChainGPT API key not configured. Contact @vladnazarxyz on Telegram for free credits.";
  }

  const response = await fetch(`${CHAINGPT_API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "general_assistant",
      messages: [{ role: "user", content: prompt }],
      maxTokens: 500,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`chaingpt_failed_${response.status}`);
  }

  const data = (await response.json()) as ChainGPTChatResponse;
  return data.text ?? "No response from ChainGPT.";
}

export async function auditSmartContract(
  contractCode: string,
  apiKey?: string,
  signal?: AbortSignal,
): Promise<string> {
  const prompt = `Audit this smart contract for security vulnerabilities, gas optimization, and best practices:\n\n${contractCode}`;
  return chatWithChainGPT(prompt, apiKey, signal);
}

export async function generateVaultRecommendation(
  userTokens: string[],
  riskTolerance: "low" | "medium" | "high",
  apiKey?: string,
  signal?: AbortSignal,
): Promise<string> {
  const prompt = `Based on the user's tokens (${userTokens.join(", ")}) and risk tolerance (${riskTolerance}), recommend the best confidential vault strategy on Nox Protocol (iExec). Consider: APY optimization, TVL safety, time lock preferences, and privacy benefits of confidential tokens (ERC-7984). Focus on Arbitrum ecosystem.`;
  return chatWithChainGPT(prompt, apiKey, signal);
}
