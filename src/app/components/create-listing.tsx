"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";

export function CreateScrapListing() {
  const { signAndSubmitTransaction } = useWallet();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signAndSubmitTransaction({
        type: "entry_function_payload",
        function: "scrap_market::list_scrap",
        arguments: [
          formData.title,
          formData.description,
          formData.price,
          formData.imageUrl,
        ],
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Create New Listing</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price in APT"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Create Listing
      </button>
    </form>
  );
}