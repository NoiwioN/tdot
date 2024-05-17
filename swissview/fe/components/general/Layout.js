import Header from "/components/general/Header";
import styles from "./Layout.module.css";
import {useRouter} from "next/router";

export default function Layout(props) {

    const router = useRouter();
    const isSpecialPage = ["/", "/cantons/[id]", "/404"].includes(router.pathname);

    const mainClass = isSpecialPage ? styles.main : `${styles.main} ${styles.imageBackground}`;
    const display = isSpecialPage ? styles.displayFullScreen : styles.displayContainer;

    return (
        <>
            <Header/>
            <main className={mainClass}>
                {/*TODO: put div style (width) into CSS file*/}
                <div className={display}>
                    {props.children}
                </div>
            </main>
        </>
    )
}
