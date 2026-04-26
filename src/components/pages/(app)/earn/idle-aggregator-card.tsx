import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { type FeatureCard, FeatureSections } from "@/components/ui";

const ARBITRUM_CHAIN = {
  name: "Arbitrum",
  logo: "/Assets/Images/Logo-Coin/arb-logo.svg",
} as const;

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "neverland",
    protocol: "Neverland",
    chains: [ARBITRUM_CHAIN],
    aprRange: "127 – 490",
    logo: "/Assets/Images/Logo-DeFi/neverland-money-logo.jpg",
    tint: "rgba(139, 92, 246, 0.14)",
  },
  {
    id: "morpho",
    protocol: "Morpho",
    chains: [ARBITRUM_CHAIN],
    aprRange: "511 – 1252",
    logo: "/Assets/Images/Logo-DeFi/morpho-logo.webp",
    tint: "rgba(59, 130, 246, 0.14)",
  },
  {
    id: "euler",
    protocol: "Euler Finance",
    chains: [ARBITRUM_CHAIN],
    aprRange: "2.1 – 804",
    logo: "/Assets/Images/Logo-DeFi/euler-finance-logo.svg",
    tint: "rgba(55, 190, 193, 0.12)",
  },
];

export function IdleAggregatorCard() {
  return (
    <FeatureSections
      eyebrow="iEx AI Aggregator · Arbitrum-first"
      eyebrowIcon={
        <Image
          src="/Assets/Images/Logo-Brand/logo-transparent.png"
          alt="iEx AI"
          width={18}
          height={18}
          className="h-4 w-4 object-contain"
        />
      }
      title="Best yield on Arbitrum, aggregated live."
      description={
        <>
          Enter an amount to discover top vault routes on{" "}
          <span className="inline-flex items-baseline gap-1 align-baseline">
            <span className="font-semibold text-main">Arbitrum</span>
          </span>{" "}
          across Neverland, Morpho & Euler — streamed in real time from{" "}
          <span className="inline-flex items-baseline gap-1 align-baseline">
            <span className="font-semibold text-main">Nox Protocol</span>
          </span>
          .
        </>
      }
      cards={FEATURE_CARDS}
      columns={3}
      footer={
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-2 text-sm font-semibold text-main">
            <FiArrowLeft className="h-4 w-4" />
            Enter an amount to continue
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-faint">
            <span className="font-semibold text-muted">Nox Protocol</span>
            Powered by Nox Protocol
          </div>
        </div>
      }
    />
  );
}
