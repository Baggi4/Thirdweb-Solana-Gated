import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useClaimNFT,
  useLogin,
  useProgram,
  useUser,
} from "@thirdweb-dev/react/solana";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    import("@solana/wallet-adapter-react-ui").then(
      (module) => module.WalletMultiButton
    ),
  { ssr: false }
);

const LoginPage: NextPage = () => {
  const { login, isLoading: loginLoading } = useLogin();
  const { publicKey } = useWallet();
  const { user, isLoading: userLoading } = useUser();
  const wallet = useWallet();
  const { program } = useProgram(
    "i1PKBSVtDD9dmfgJkFNZV61pf7wUknbSrtjyPc1iwR1",
    "nft-drop"
  );
  const claim = useClaimNFT(program);
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
      <p className={styles.explain}>
        Explore what you can do with thirdweb&rsquo;s brand new Solana Gated
        Website{" "}
      </p>
      <p className={styles.explain}>
        you must own a thirdweb NFT to access this{" "}
        <b>
          <Link href="/" passHref className={styles.lightPurple}>
            Protected Page
          </Link>
        </b>
      </p>
      <div>
        <div>
          {wallet.connected ? (
            <button onClick={() => claim.mutate({ amount: 1 })}>
              {claim.isLoading ? "Claiming..." : "Claim NFT"}
            </button>
          ) : (
            <p className={styles.explain}>Disconnected</p>
          )}
        </div>
      </div>
      {user && <p>Logged in as {user.address} </p>}
        <WalletMultiButtonDynamic />
    </div>
  );
};

export default LoginPage;
