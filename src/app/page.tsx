"use client";

import { WalletButtons } from "./components/wallet-button";
import { ScrapList } from "./components/scrap-list";

export default function Home() {
  return (    
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Scraps</h1>
          <WalletButtons />
        </header>
        
        <ScrapList />
      </div>
    </main>
  );
}