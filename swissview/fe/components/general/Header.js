import styles from './Header.module.css';
import Link from "next/link";
import {useGlobalContext} from "../../store";
import {useRouter} from "next/router";
import {
    faCalendarDays,
    faGlobe,
    faMapLocationDot,
    faRightFromBracket,
    faRightToBracket,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from "react-i18next";


export default function Header() {

    const {session} = useGlobalContext()
    const router = useRouter();
    const {i18n} = useTranslation()

    const toggleLanguage = () => {
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === 'de' ? 'ch' : 'de';
        i18n.changeLanguage(newLanguage);
    }
    return (
        <header className={styles.header}>
            {/* Map button */}
            {router.pathname !== '/' &&
                <Link href="/" className={styles.button}>
                    <FontAwesomeIcon icon={faMapLocationDot} className={styles.icon} />
                </Link>
            }
            {/* Map button */}
            {router.pathname !== '/events' &&
                <Link href="/events" className={styles.button}>
                    <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
                </Link>
            }
            {/* Profile button */}
            {session &&
                <Link href="/profile" className={styles.button}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                </Link>
            }
            {/* Login / Logout Button*/}
            {session &&
                <Link href="/logout" className={styles.button}>
                    <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />
                </Link>
            }
            {!session &&
                <Link href="/login" className={styles.button}>
                    <FontAwesomeIcon icon={faRightToBracket} className={styles.icon} />
                </Link>
            }
            {/* Language button */}
            <button onClick={toggleLanguage} className={styles.button}>
                <FontAwesomeIcon icon={faGlobe}
                                 className={i18n.language === 'de' ? `${styles.icon}` : `${styles.icon} ${styles.invertedIcon}`}
                />
            </button>
        </header>
    )
}
