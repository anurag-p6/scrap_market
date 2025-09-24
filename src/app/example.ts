import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Specify which network to connect to via AptosConfig
async function example() {
  console.log(
    "This example will create two accounts (Alice and Bob), fund them, and transfer between them.",
  );

  // Setup the client
  const config = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(config);
}

example()