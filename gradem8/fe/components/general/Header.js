import styles from './Header.module.css';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useGlobalContext} from "../../store";
import {useRouter} from "next/router";
import {faBars, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function Header() {
    const {session} = useGlobalContext()

    const [navHidden, setNavHidden] = useState(true);

    const router = useRouter();
    const href = router.asPath;

    const getLinkClass = (url, exact) => {
        const cond = exact ? url === href : href.startsWith(url);
        return cond ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`;
    }

    return (
        <header className={`${styles.header} ${navHidden ? styles.navHidden : null}`}>
            <Link className={styles.logoContainer} href="/">
                <img src="/logo.png" alt="Gradem8 Logo"/>
            </Link>
            <nav className={styles.nav} onClick={() => setNavHidden(true)}>
                {
                    session === null ? (
                        <>
                            <Link href="/"
                                  className={getLinkClass("/", true)}>Home</Link>
                            <Link href="/login" title="Login" className={styles.btnLoginLogout}>
                                Already registered? &nbsp; <strong>Login</strong>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/"
                                  className={getLinkClass("/", true)}>Home</Link>
                            <Link href="/semesters"
                                  className={getLinkClass("/semesters")}>Semesters</Link>
                            <Link href="/profile"
                                  className={getLinkClass("/profile")}>Profile</Link>
                            <Link href="/logout" title="Logout" className={styles.btnLoginLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket}/>
                            </Link>
                        </>
                    )
                }
            </nav>
            <a className={styles.navToggle} onClick={() => setNavHidden(!navHidden)}>
                <FontAwesomeIcon icon={faBars}/>
            </a>
        </header>
    )
}
