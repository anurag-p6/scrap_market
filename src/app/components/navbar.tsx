"use client";

import Link from "next/link";
import { WalletButtons } from "./wallet-button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "List Scrap", path: "/list-scrap" },
    { name: "My Listings", path: "/my-listings" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Scrap Market
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.path
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <WalletButtons />
        </div>
      </div>
    </nav>
  );
}