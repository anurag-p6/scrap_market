"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";

interface Scrap {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export function ScrapCard({ scrap }: { scrap: Scrap }) {
  const { signAndSubmitTransaction } = useWallet();
  const { id, title, description, price, imageUrl } = scrap;
  const handlePurchase = async () => {
    try {
      // Add your purchase transaction logic here 
      await signAndSubmitTransaction({
        function: "0x1::scrap_market::buy_scrap",
        arguments: [id, price],
        type_arguments: [],
      }); 
    } catch (error) {
      console.error("Error purchasing scrap:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        className="rounded-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">{price} APT</span>
          <button
            onClick={handlePurchase}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}