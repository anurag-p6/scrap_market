"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState } from "react";
import { AptosClient } from "aptos";
import { CameraCapture } from "./camera-capture";
import { uploadToIPFS } from "@/lib/ipfs";

const client = new AptosClient("https://fullnode.testnet.aptoslabs.com");

export function UploadScrap() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageCapture = async (imageBlob: Blob) => {
    setLoading(true);
    try {
      const ipfsUrl = await uploadToIPFS(imageBlob);
      setFormData((prev) => ({ ...prev, imageUrl: ipfsUrl }));
      setImagePreview(URL.createObjectURL(imageBlob));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          Date.now().toString(), // id
          formData.title,
          formData.description,
          parseFloat(formData.price),
          formData.imageUrl,
        ],
      };

      const response = await signAndSubmitTransaction(payload);
      await client.waitForTransaction(response.hash);

      // Reset form after successful upload
      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
      });

      alert("Scrap uploaded successfully!");
    } catch (error: any) {
      console.error("Error uploading scrap:", error);
      alert(`Error uploading scrap: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="text-center p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">
          Please connect your wallet to upload scraps
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Upload Scrap</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (APT)
            </label>
            <input
              type="number"
              step="0.000001"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Capture Image
            </label>
            <CameraCapture onImageCapture={handleImageCapture} />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Upload Scrap"}
          </button>
        </form>
      </div>
    </div>
  );
}