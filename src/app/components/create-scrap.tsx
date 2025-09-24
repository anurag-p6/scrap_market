"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { Types, AptosClient } from "aptos";

// Initialize Aptos client (use your network URL)
const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

export function CreateScrap() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;
    
    setLoading(true);
    try {
      const payload = {
        type: "entry_function_payload",
        function: `${account.address}::scrap_mart::add_scrap`,
        type_arguments: [],
        arguments: [
          Date.now().toString(), // Convert timestamp to string
          formData.name,
          parseInt(formData.price)
        ],
        data: undefined
      };

      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);
      
      // Reset form
      setFormData({ name: "", price: "" });
      alert("Scrap listed successfully!");
    } catch (error: any) {
      console.error("Error listing scrap:", error);
      alert(`Error listing scrap: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="text-center p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">Please connect your wallet first</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">List Your Scrap</h2>
          <p className="mt-2 text-gray-600">Fill in the details of your scrap item</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scrap Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (APT)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">APT</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "List Scrap"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}