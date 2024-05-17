import React from 'react'
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className = {styles.footer}>
        <p className={styles.footerText}>ICT-Kebab</p>
      </div>
    </div>
  )
}
