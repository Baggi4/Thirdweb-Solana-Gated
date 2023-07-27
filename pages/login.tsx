import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useClaimConditions,
  useClaimNFT,
  useLogin,
  useLogout,
  useProgram,
  useProgramMetadata,
  useUser,
} from "@thirdweb-dev/react/solana";
import { network } from "./_app";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import Head from "next/head";
require("@solana/wallet-adapter-react-ui/styles.css");

interface MaxClaimableReachedError extends Error {
  message: "Max claimable reached - 3 out of 3 NFTs have been claimed.";
}

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const LoginPage: NextPage = () => {
  const wallet = useWallet();
  const login = useLogin();
  const logout = useLogout();
  const router = useRouter();
  const user = useUser();
  const { publicKey, connected, select } = useWallet(); // wallet hook

  const { program } = useProgram(
    "i1PKBSVtDD9dmfgJkFNZV61pf7wUknbSrtjyPc1iwR1",
    "nft-drop"
  );
  const { mutateAsync: claimNFT, isLoading } = useClaimNFT(program);
  const { data: conditions, isLoading: conditionsIsLoading } =
    useClaimConditions(program);
  const claim = useClaimNFT(program);
  
  const handleLogout = () => {
    wallet.disconnect();
  };

  const handleClaimNFT = async () => {
    try {
      await claimNFT({ amount: 1 });
    } catch (error: unknown) {
      alert("You have reached the maximum limit of 3 claimed NFTs.");
    }
  };
  // console.log("useWallet", wallet);
  // console.log("conditions", conditions);
  // console.log("user", user);
  // console.log("useLogin", login );
  // console.log("useProgramMetadata", program);
  return (
    <>
      <Head>
        <title>Thirdweb | Login</title>
        <meta name="description" content="Login to Thirdweb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <div className={styles.container}>
        <div>
          <WalletMultiButtonDynamic />
          {!publicKey && (
            <button className={styles.button} onClick={() => {}}>
              Login
            </button>
          )}
          {publicKey && (
            <button className={styles.button} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
        <div>
          {wallet.connected ? (
            <button onClick={handleClaimNFT} className={styles.button}>
              {claim.isLoading ? "Claiming..." : "Claim NFT"}
            </button>
          ) : (
            <p className={styles.explain}>Disconnected</p>
          )}
        </div>
        {conditionsIsLoading ? (
          <p className={styles.explain}>Loading...</p>
        ) : (
          <p className={styles.explain}>
            {conditions?.maxClaimable} / {conditions?.totalAvailableSupply}
            {conditions?.price.displayValue && (
              <>
                {" "}
                - {parseFloat(conditions?.price.displayValue).toFixed(2)} SOL
              </>
            )}
          </p>
        )}
        <div>
          {wallet.connected ? (
            <>
              <pre>
                Connected Wallet:{" "}
                {`${publicKey?.toBase58().slice(0, 5)}...${publicKey
                  ?.toBase58()
                  .slice(-5)}`}
              </pre>
              <pre>User: {JSON.stringify(user, undefined, 2) || "N/A"}</pre>
            </>
          ) : (
            <p className={styles.explain}>
              To continue, please connect your wallet to {network} network.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
