import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

// Here we configure thirdweb auth with a domain and wallet
export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "" as string,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || "" as string) ,
});

// Use the ThirdwebAuthHandler as the default export to handle all requests to /api/auth/*
export default ThirdwebAuthHandler();