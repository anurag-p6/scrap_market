"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { AvailableWallets } from "@aptos-labs/wallet-adapter-core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      optInWallets={["Petra" as AvailableWallets]} // 👈 optional, to restrict wallets
      onError={(err) => console.error("Wallet error:", err)}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
