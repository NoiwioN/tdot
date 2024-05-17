import Link from "next/link";
import styles from "./index.module.css";
import Head from "next/head";
import Map from "../components/general/Map"
import './i18n'

/**
 * Home page
 * @returns {JSX.Element}
 */
export default function homePage() {
    return (
        <>
            <div className={styles.home}>
                <Head>
                    <title>Home - SwissView</title>
                </Head>
                <Map />
            </div>
        </>
    );
}
