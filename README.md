# Scrap Mart ♻️

Scrap Mart is a **decentralized marketplace** for buying and selling scrap items, built on the **Aptos blockchain**.  
It enables direct, trustless transactions between sellers and buyers using smart contracts, ensuring **transparency, security, and fair pricing**.

---

## 🚩 Problem
Scrap trading today is highly **unorganized**:
- Middlemen reduce seller profits.
- Buyers face **fraud risks**.
- No transparent way to verify **ownership, pricing, or authenticity**.

---

## 💡 Solution
Scrap Mart solves this by:
- Allowing **direct peer-to-peer transactions** via smart contracts.
- Recording all trades, ownership, and pricing **securely on the Aptos blockchain**.
- Using **IPFS (Pinata)** to store scrap item images in a decentralized way.
- Offering a simple **Next.js frontend** for users to interact with the marketplace.

---

## 🏗️ Architecture

- **Smart Contracts** → Built in **Move** on Aptos.
- **Frontend** → Built with **Next.js**.
- **Storage** → Scrap images stored on **IPFS (via Pinata)**.
- **Blockchain** → Aptos records trades, ownership, and pricing.

---

## 🔄 Flow

1. **Seller** creates and lists scrap items.
2. **Buyer** views and purchases items.
3. Transaction is **recorded on-chain** with full transparency.

---

## 🌐 Live Explorer Example

A deployed transaction on Aptos Mainnet:  
👉 [View on Aptos Explorer](https://explorer.aptoslabs.com/txn/0x70bf5f14ecb9033fcf7f901e53a377d72c7550e95655476f627cb2a7bae4af92?network=mainnet)

---

## 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/anurag-p6/scrap_market
cd scrap_market
