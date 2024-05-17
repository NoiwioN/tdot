import Link from 'next/link'
import styles from './Food.module.css'
import Image from 'next/image'


export default function Food({ props }){
    /*/const picture = `/../public/food/${props.id}.png`/*/
    return (
        <div className={styles.food}>
            <h3 className={styles.foodTitle}>{props.name}</h3>
            <div className={styles.container}>
                <Image src={`/food/${props.id}.png`} alt={`${props.name}`} width={100} height={100} className = {styles.image}/>
                <p>{props.beschreibung}
                <br />
                <Link className={styles.foodLink} href={`/items/food/${props.id}`}>Mehr anzeigen</Link>
                </p> 
            </div>
        </div>
    )
}