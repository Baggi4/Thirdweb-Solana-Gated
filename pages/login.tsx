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
  useUser,
} from "@thirdweb-dev/react/solana";
import styles from "../styles/Home.module.css";
import { network } from "./_app";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
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
  console.log(wallet);

  const handleLogin = async () => {
    await login(); // login
    router.push("/"); // redirect to home page
  };
  const handleLogout = () => {
    wallet.disconnect();
  };

  const handleClaimNFT = async () => {
    try {
      await claimNFT({ amount: 1 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("You have reached the maximum limit of 3 claimed NFTs.");
      } else {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Image
          src="/thirdweb.svg"
          height={75}
          width={115}
          style={{
            objectFit: "contain",
          }}
          alt="thirdweb"
        />
        <Image
          width={75}
          height={75}
          src="/sol.png"
          className={styles.icon}
          alt="sol"
        />
      </div>
      <h1 className={styles.h1}>Solana, meet thirdweb 👋</h1>
      <p className="text-red">
        Explore what you can do with thirdweb&rsquo;s brand new Solana Gated
        Website{" "}
      </p>
      <p className={styles.explain}>
        you must own a thirdweb NFT to access this{" "}
        <b>
          <Link href="/" className={styles.lightPurple}>
            Protected Page
          </Link>
        </b>
      </p>
      <p className={styles.explain}>
        you can claim your NFT by clicking the button below 👇
      </p>
      <div>
        <div>
          <WalletMultiButtonDynamic />

          {!publicKey && (
            <button className={styles.button} onClick={handleLogin}>
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
          </p>
        )}
        <div>
          {wallet.connected ? (
            <>
              <p className={styles.explain}>connected to: {network}</p>
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
              To continue, please connect your wallet to devnet network.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
