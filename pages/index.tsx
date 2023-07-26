import { GetServerSideProps } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { getUser } from "../auth.config";
import styles from "../styles/Home.module.css";

function Protected(props: any) {
  return (
    <div className={styles.container}>
      <h1>Protected Page</h1>
      <p>user: {props.user.address}</p>
      <p>You have access to this page</p>
      <p>{props.data.message}</p>
    </div>
  );
}

export default Protected;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork("devnet");
  const user = await getUser(req);
  if (!user) {
    console.log("User not identified. Redirecting to login page.");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const program = await sdk.getNFTDrop(
    "i1PKBSVtDD9dmfgJkFNZV61pf7wUknbSrtjyPc1iwR1"
  );
  const nfts = await program?.getAllClaimed();

  const hasNFT = nfts?.some((nft) => nft.owner === user.address);

  if (!hasNFT) {
    console.log(
      "User does not have the required NFT. Redirecting to login page."
    );
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = { message: "You have access to this page" };
  console.log("User has the required NFT. Returning data:", data);
  return {
    props: {
      user,
      data,
    },
  };
};
