import React from 'react'
import Image from 'next/image';
import styles from "./Header.module.css";
import Navigation from './Navigation';
import Link from 'next/link';
import Head from 'next/head';

export default function Header() {
  return (
    <div className={styles.header}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>ICT-Kebab</title>
      </Head>
      <div className={styles.container}>
        <div>
          <Link href={'/'}>
            <Image src="/ictkebablogo.png" alt="logo" width = {100} height = {100}/>
          </Link>
          <Link className = {styles.title} href={'/'}>ICT-Kebab</Link>
        </div>
          <Navigation className={styles.nav} />
      </div>
    </div>
  )
}
