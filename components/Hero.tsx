import React from 'react';
import styles from '../styles/Home.module.css'; // Make sure to use the correct relative path
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
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
    </div>
  );
};

export default Hero;
