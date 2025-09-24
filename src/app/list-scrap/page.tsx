"use client";

import { CreateScrap } from "../components/create-scrap";

export default function ListScrapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">List Your Scrap</h1>
      <CreateScrap />
    </div>
  );
}