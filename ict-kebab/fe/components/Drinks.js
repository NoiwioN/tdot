import Link from 'next/link'
import styles from './Drinks.module.css'
import Image from 'next/image'


export default function Drinks({props}){
    return (
        <div className={styles.drinks}>
            <h3 className={styles.drinksTitle}>{props.name}</h3>
            <div className={styles.container}>
                <Image src={`/drinks/${props.id}.png`} alt={`${props.name}`} width={100} height={100} className = {styles.image}/>
                <p>{props.groesse}l
                <br />
                <Link className={styles.drinksLink} href={`/items/drinks/${props.id}`}>Mehr anzeigen</Link>
                </p> 
            </div>
        </div>
    )
}