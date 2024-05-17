import Header from "/components/general/Header";
import styles from "./Layout.module.css";

export default function Layout(props) {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {props.children}
            </main>
        </>
    )
}