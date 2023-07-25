import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
export const network: Network = "devnet";
const clientId = process.env.NEXT_CLIENT_ID as string;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      authConfig={{
        // This domain should match the backend
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        // Pass the URL of the auth endpoints
        authUrl: "/api/auth",
      }}
      network={network}
      clientId={clientId}
    >
      <WalletModalProvider>
        <Component {...pageProps} />
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
