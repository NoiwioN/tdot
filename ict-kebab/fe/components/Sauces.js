import Link from 'next/link'
import Image from 'next/image';
import styles from './Sauces.module.css'

export default function Sauces({props}){
    return (
    <div className={styles.sauces}>
        <h3 className={styles.saucesTitle}>{props.name}</h3>
            <div className={styles.container}>
                <Image src={`/sauces/${props.id}.png`} alt={`${props.name}`} width={100} height={100} className = {styles.image}/>
                <p>{props.art}
                <br />
                <Link className={styles.saucesLink} href={`/items/sauces/${props.id}`}>Mehr anzeigen</Link>
            </p> 
        </div>
    </div>
    )
}