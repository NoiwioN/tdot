import styles from './Canton.module.css';
import {useTranslation} from "react-i18next";
import formStyles from "../../styles/forms.module.css";
import Link from "next/link";
import btnStyles from "../../styles/buttons.module.css";
import RequireLogin from "../auth/RequireLogin";

export default function Canton({canton, data, userCount}) {

    const {t} = useTranslation();


    return (

        <div className={styles.container}>

            <img src={`/coatOfArms/${canton.id.toLowerCase()}.png`}
                 className={styles.img}
                 alt={`Coat of Arms of ${canton.name}`}
            />
            <article className={styles.textArea}>
                <div className={formStyles.headerForm}>
                    <h1>{canton.name}</h1>
                    <RequireLogin requireAdmin={true} redirect={false}>
                        <Link className={btnStyles.editBtn}
                              href={`/cantons/${canton.id}/edit`}>{t("cantonDetails:editCanton")}</Link>
                    </RequireLogin>
                </div>
                <h6>{t("cantonDetails:short")}</h6>
                <p className={styles.preLine}>{data.short}</p>
                <h6>{t("cantonDetails:attractions")}</h6>
                <p className={styles.preLine}>{data.attractions}</p>
                <h6>{t('cantonDetails:specials')}</h6>
                <p className={styles.preLine}>{data.specials}</p>
            </article>
            <div className={styles.box}>
                <h3>{t('cantonDetails:profil')}</h3>
                <div>
                    <p>{t('cantonDetails:area')}</p>
                    <p>{canton.area} km<sup>2</sup></p>
                </div>
                <div>
                    <p>{t('cantonDetails:population')}</p>
                    <p>{canton.population}</p>
                </div>
                <div>
                    <p>{t('cantonDetails:joinYear')}</p>
                    <p>{canton.joinYear}</p>
                </div>
                <div>
                    <p>{t('cantonDetails:users')}</p>
                    <p>{userCount}</p>
                </div>
            </div>
        </div>
    )
}