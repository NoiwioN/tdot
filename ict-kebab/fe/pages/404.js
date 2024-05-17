import React from 'react';
import styles from "./404.module.css";
import Image from 'next/image';

export default function Custom404Page() {
    return (
    <div className = {styles.page}>
        <h1 className={styles.title}>Hoppla! Die von Ihnen angeforderte Seite konnte nicht gefunden werden</h1>
        <p className={styles.text}>Bitte überprüfen Sie die URL auf Tippfehler und versuchen Sie es erneut</p>
        <Image src="/404.jpg" alt="404" width = {1024} height = {1024} className = {styles.image}/>
        <button onClick={() => window.history.back()} className={styles.btn}>Zurück</button>
    </div>
    )
}