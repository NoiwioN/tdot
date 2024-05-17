import Link from "next/link"
import ICTKebabAPI from "@/lib/api/ICTKebab"
import styles from "./DetailSauces.module.css"
import Image from 'next/image';
import { useContext } from "react";
import CartContext from "@/store/CartContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailDrinks({ sauces }) {

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
      addToCart({ ...sauces, type: 'sauce' });
    };
    
    return !sauces ? null : (
        <div className={styles['detail-container-styling']}>
            <div className={styles['content-container']}>
                <h1>{sauces.name}</h1>
                <p>Preis: {sauces.preis} CHF</p>
                <p>{sauces.art}</p>
            </div>
            <div className={styles['image-container']}>
        <Image
          src={`/sauces/${sauces.id}.png`}
          alt={`${sauces.name}`}
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles['detail-buttons-container']}>
        <button className={styles.button} onClick={handleAddToCart}>Zu Warenkorb hinzufügen</button>
          <Link href={`/Menu`} passHref>
            <button className={styles.button}>Zurück</button>
          </Link>
      </div>
        </div>
    )
}



export async function getStaticProps(context) {
    const id = context.params.id
    const sauces = await ICTKebabAPI.readIdSauces(id)
    return {
        props: { sauces }, revalidate: 10
    }
}

export async function getStaticPaths() {
    const sauces = await ICTKebabAPI.readSauces()
    const paths = sauces.map(sauces => (
        {
            params: { id: sauces.id.toString() }
        })
    )
    return { paths, fallback: true }
} 

