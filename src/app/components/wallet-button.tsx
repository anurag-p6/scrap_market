"use client";

import React from "react";
import { useWallet, AdapterWallet, WalletReadyState } from "@aptos-labs/wallet-adapter-react";

export const WalletButtons = () => {
  const { wallets, connected, connect, disconnect, isLoading } = useWallet();

  if (connected) {
    return (
      <button
        onClick={disconnect}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
      >
        Disconnect
      </button>
    );
  }

  if (isLoading || wallets.length === 0) {
    return <span>Loading wallets...</span>;
  }

  return <WalletView wallet={wallets[0]} connect={connect} />;
};

interface WalletViewProps {
  wallet: AdapterWallet;
  connect: (name: string) => void; // ✅ Fixed: changed from Promise<void> to void
}

const WalletView: React.FC<WalletViewProps> = ({ wallet, connect }) => {
  const isReady = wallet.readyState === WalletReadyState.Installed;

  const onWalletConnect = () => {
    try {
      connect(wallet.name);
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    }
  };

  return (
    <button
      onClick={onWalletConnect}
      disabled={!isReady}
      className={`px-4 py-2 rounded text-white ${
        isReady ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      {isReady ? `Connect ${wallet.name}` : `${wallet.name} - Not Ready`}
    </button>
  );
};