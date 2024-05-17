import React from 'react'
import styles from './contact.module.css'
import Link from 'next/link'

export default function Contact() {
  return (
    <>
        <div className={styles.container}>
            <p className={styles.text}>
                Du kannst uns auf unserer Email erreichen: 
                <Link href="mailto:ictkebab.laden@gmail.com" className={styles.link}>ictkebab.laden@gmail.com</Link>
            </p>
        </div>
        <div className={styles.container}>
            <p className={styles.text}>
                Oder du kannst uns auf unserer Telefonnummer erreichen: <Link href="tel: 123456789" className={styles.link}>123456789</Link>
            </p >
        </div>
        <div className={styles.container}>
            <p className={styles.text}>
                Wenn du uns persönlich besuchen möchtest, dann kannst du uns auf unserer Adresse besuchen: 
            </p>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2723.2732141551332!2d7.437355976445905!3d46.95632173265569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e391309a50b11%3A0xa737841ff19a9ded!2sICT%20Campus%20Post!5e0!3m2!1sde!2sch!4v1711632228661!5m2!1sde!2sch" 
            width="900" 
            height="450" 
            className={styles.map}
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            ></iframe>          
        </div>
        <div className={styles.container}>
            <p className={styles.text}>
                Oder du kannst uns auf unserer Social Media erreichen: <Link className={styles.link} href="https://www.tiktok.com/@ictkebab">Tiktok</Link>, <Link className={styles.link} href="https://www.instagram.com/ictkebab/">Instagram</Link>, <Link className={styles.link} href="https://www.twitter.com/ictkebab">Twitter</Link>
            </p>
        </div>
        <Link href="/" className={styles.buttonLink}>
            <button className={styles.button}>Zurück</button>
        </Link>

    </>
  )
}
