import React from 'react'
import Image from 'next/image';
import styles from './noaccess.module.css'

export default function noaccess() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Access denied</h1>
        <p className={styles.text}>You need to be logged in to access this page</p>
        <Image src="/NoAccess.png" alt="No access" width={500} height={500} />
    </div>
  )
}
