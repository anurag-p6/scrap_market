"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ScrapList } from "../components/scrap-list";

export default function MyListingsPage() {
  const { account } = useWallet();

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <p className="text-yellow-700">Please connect your wallet to view your listings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Listings</h1>
      <ScrapList ownerAddress={account.address} />
    </div>
  );
}