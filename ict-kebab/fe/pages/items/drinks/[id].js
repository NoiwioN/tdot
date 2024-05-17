import Link from "next/link"
import ICTKebabAPI from "@/lib/api/ICTKebab"
import styles from "./DetailDrinks.module.css"
import Image from 'next/image';
import { useContext } from "react";
import CartContext from "@/store/CartContext";

export default function DetailDrinks({ drinks }) {

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart({ ...drinks, type: 'drink' });
      };

    return !drinks ? null : (
        <div className={styles['detail-container-styling']}>
            <div className={styles['content-container']}>
                <h1>{drinks.name}</h1>
                <p>Preis: {drinks.preis} CHF</p>
                <p>{drinks.groesse}</p>
            </div>
            <div className={styles['image-container']}>
                <Image
                src={`/drinks/${drinks.id}.png`}
                alt={`${drinks.name}`}
                width={200}
                height={200}
                className={styles.image}
                />
            </div>
            <div className={styles['detail-buttons-container']}>
            <button className={styles.button} onClick={handleAddToCart}>Zu Warenkorb hinzufügen</button>
                <Link href={`/Menu`} passHref>
                    <button className={styles.button}>Back</button>
                </Link>
            </div>
        </div>
    )
}



export async function getStaticProps(context) {
    const id = context.params.id
    const drinks = await ICTKebabAPI.readIdDrinks(id)
    return {
        props: { drinks }, revalidate: 10
    }
}

export async function getStaticPaths() {
    const drinks = await ICTKebabAPI.readDrinks()
    const paths = drinks.map(drinks => (
        {
            params: { id: drinks.id.toString() }
        })
    )
    return { paths, fallback: true }
} 

