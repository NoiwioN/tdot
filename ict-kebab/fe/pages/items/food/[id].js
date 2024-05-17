import Link from "next/link";
import ICTKebabAPI from "@/lib/api/ICTKebab";
import { useRouter } from 'next/router';
import { useGlobalContext } from "@/store";
import styles from "./DetailFood.module.css";
import Image from 'next/image';
import { useContext } from "react";
import CartContext from "@/store/CartContext";

export default function DetailFood({ food }) {

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
      addToCart({ ...food, type: 'food' });
    };


  return !food ? null : (
    <div className={styles['detail-container-styling']}>
      <div>
        <h1>{food.name}</h1>
        <p>Preis: {food.preis} CHF</p>
        <p>{food.beschreibung}</p>
        <div className={styles.imageContainer}>
          <Image src={`/food/${food.id}.png`} alt={`${food.name}`} width={100} height={100} className={styles.image} />
        </div>
      </div>

      <div className={styles['detail-buttons-container']}>
        <button className={styles.button} onClick={handleAddToCart}>Zu Warenkorb hinzufügen</button>
          <Link href={`/Menu`} passHref>
            <button className={styles.button}>Zurück</button>
          </Link>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const food = await ICTKebabAPI.readIdFood(id);
  return {
    props: { food },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const food = await ICTKebabAPI.readFood();
  const paths = food.map(food => ({
    params: { id: food.id.toString() }
  }));
  return { paths, fallback: true };
}