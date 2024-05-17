import Image from 'next/image';
import styles from './index.module.css'
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1 className={styles.title}>Willkommen zu ICT-Kebab</h1>

      <div className={styles.container_flex}>
        <p className={styles.text}>
        Entdecken Sie bei uns im Kebab-Laden das traditionelle 
        türkische Lahmacun: knuspriger Teig, sorgfältig belegt
        mit einer würzigen Mischung aus Hackfleisch, Tomatensoße
        und frischen Kräutern. Ein Geschmackserlebnis, dass Ihre
        Sinne verwöhnt und Sie in die Aromen der Türkei entführt.
        </p>

        <Image src="/lahmacun.png" alt="logo" width = {700} height = {440} className={styles.image} />
      </div>
      <div className={styles.centerContainer}>
        <div className={styles.container_openingTime}>
          <h2>Öffnungszeiten</h2>
          <p>Montag - Freitag: 11:00 - 21:00 Uhr</p>
          <p>Samstag: 11:00 - 22:00 Uhr</p>
          <p>Sonntag: 12:00 - 20:00 Uhr</p>
        </div>
      </div>


      <Link className={styles.buttonContainer} href={'Menu'}>
          <button className={styles.button}>Unser Menu</button>
      </Link>
    </>
  );
}
