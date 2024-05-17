import Link from "next/link";
import styles from "./index.module.css";
import Head from "next/head";

/**
 * Home page
 * @returns {JSX.Element}
 */
export default function homePage() {
    return (
        <>
            <div>
                <Head>
                    <title>Home - GradeM8</title>
                </Head>
                <h1>Welcome to GradeM8</h1>
                <h3>A tool designed by students, for students, to make your life easier and more organized :)</h3>
                <div className={styles.howWorksContainer}>
                    <div className={styles.howWorksQuestion}>
                        <h3>How does it work?</h3>
                    </div>
                    <div className={styles.howWorksGrid}>
                        <div className={styles.signUpContainer}>
                            <p> Sign up, it's free!</p>
                            <Link href="/register" className={styles.signUpBtn}>
                                <i>SIGN UP</i>
                            </Link>
                        </div>
                        <div>
                            <p>Customize your grade-tracker. sort by subject <i>and</i> semester.</p>
                        </div>
                        <div>
                            <p>Keep track of your midterms and finals with the integrated calendar feature.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className="footerDescription">
                    <span className="contact">
                        Contact Us
                    </span>
                    <span className="separator">
                        &nbsp;|&nbsp;
                    </span>
                    <span className="userTerms">
                        Terms & Conditions
                    </span>
                </div>
            </footer>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {},
    }
}
