"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";
import { ScrapCard } from "./scrap-card";
import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

interface ScrapListProps {
  ownerAddress?: string;
}

type Scrap = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  owner: string;
};

export function ScrapList({ ownerAddress }: ScrapListProps) {
  const { account } = useWallet();
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScraps = async () => {
      if (!account) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get the ScrapMart resource from the contract
        const resources = await client.getAccountResources(account.address.toString());
        const scrapMartResource = resources.find(
          (r) => r.type === `${account?.address}::scrap_mart::ScrapMart`
        );

        if (!scrapMartResource || !scrapMartResource.data) {
          throw new Error("ScrapMart resource not found");
        }

        const fetchedScraps = (scrapMartResource.data as any).scraps || [];
        const filteredScraps = ownerAddress
          ? fetchedScraps.filter((scrap: Scrap) => scrap.owner === ownerAddress)
          : fetchedScraps;

        setScraps(filteredScraps);
      } catch (err: any) {
        console.error("Error fetching scraps:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScraps();
  }, [account, ownerAddress]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (scraps.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No scraps found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scraps.map((scrap) => (
        <ScrapCard key={scrap.id} scrap={scrap} />
      ))}
    </div>
  );
}