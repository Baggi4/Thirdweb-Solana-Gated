import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ethers } from "ethers";
// Assuming you have a publicKey value (replace 'yourPublicKey' with the actual value)
const publicKey = process.env.NEXT_PUBLIC_THIRDWEB_AUTH_PUBLIC_KEY || "";

// Generate a random private key using ethers
const randomPrivateKey = ethers.Wallet.createRandom().privateKey;

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(randomPrivateKey || "", publicKey),
});
export default ThirdwebAuthHandler();