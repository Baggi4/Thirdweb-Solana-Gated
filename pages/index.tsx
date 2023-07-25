import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
require("@solana/wallet-adapter-react-ui/styles.css");
import { network } from "./_app";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useProgram, useClaimNFT } from "@thirdweb-dev/react/solana";

import { GetServerSideProps } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { getUser } from "../auth.config";

import { programAddress } from "../const/yourDetails";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Define the network variable with the desired network value (e.g., "mainnet", "testnet", etc.)
  const network = "devnet";

  // Create an instance of ThirdwebSDK with the specified network
  const sdk = ThirdwebSDK.fromNetwork(network);

  // Perform authentication check using the getUser function from auth.config
  const user = await getUser(req);

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If the user is authenticated, you can proceed with any additional logic or data fetching
  // and return the necessary props for the component using the `props` property.

  return {
    props: {}, // Add any additional props you need to pass to the component here
  };
};
function Protected() {
  return (
    <div className={styles.container}>
      <h1>Protected Page</h1>
      <p>Thank you for you purchase</p>
    </div>
  );
}

export default Protected;
