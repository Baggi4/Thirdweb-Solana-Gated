import React from "react";
import type { AppProps } from "next/app";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "../styles/globals.css";


// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
export const network: Network = "devnet";
export const wallet = new PhantomWalletAdapter();
export const domain = "http://localhost:3000";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      network={network}
    >
      <WalletModalProvider>
        <Component {...pageProps} />
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
