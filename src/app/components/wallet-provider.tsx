"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { AvailableWallets } from "@aptos-labs/wallet-adapter-core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      optInWallets={["Petra" as AvailableWallets]}
      onError={(err) => {
        // Ignore user rejection errors
        if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          (err as any).message === "User has rejected the request"
        ) {
          // Optionally, show a toast or silent i gnore
          return;
        }
        console.error("Wallet error:", err);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
