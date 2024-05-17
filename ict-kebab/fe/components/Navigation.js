import React, { useState } from 'react'
import Link from 'next/link'
import styles from './Navigation.module.css'
import ShoppingCart from './ShoppingCart'
import { useGlobalContext } from '@/store'

export default function Navigation() {

  const { session } = useGlobalContext()

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
        <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link href="/Menu" className={styles.link}>Menu</Link>
              </li>
              <li className={styles.item}>
                <Link href="/AboutUs" className={styles.link}>Über uns</Link>
              </li>
              <li className={styles.item}>
                <Link href="/contact" className={styles.link}>Kontakt</Link>
              </li>
              <li className={styles.item}>
                {session ? <Link href="/profil" className={styles.link}>Profil</Link> : <Link href="/login" className={styles.link}>Login</Link>}
              </li>
              <li onClick={() => setIsCartOpen(!isCartOpen)} className={styles.item}>
                <img src="ShoppingCartLogo.png" alt="Cart" width={35} height={35} className={styles.shoppingcart} />
              </li>
              <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
            </ul>
        </nav>
    </div>
  )
}