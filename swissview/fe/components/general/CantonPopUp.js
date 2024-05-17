import styles from "./CantonPopUp.module.css"
import {useTranslation} from "react-i18next";

export default function CantonPopUp({canton, position}){
    const {t} = useTranslation();
    return(
        <div className={styles.popup} style={position}>
            <img src={`/coatOfArms/${canton.id.toLowerCase()}.png`} alt={`Coat of Arms of ${canton.name}`} />
            <div className={styles.headerTitle}>{canton.name}</div>
            <div className={styles.infoContainer}>
                <div className={styles.infoDetail}>
                    {t('cantonPopUp:area')} <br />
                    {canton.area} km<sup>2</sup>
                </div>
                <div className={styles.infoDetail}>
                    {t('cantonPopUp:population')} <br />
                    {canton.population}
                </div>
                <div className={styles.infoDetail}>
                    {t('cantonPopUp:capital')} <br />
                    {canton.capital}
                </div>
                <div className={styles.infoDetail}>
                    {t('cantonPopUp:joinYear')} <br />
                    {canton.joinYear}
                </div>
            </div>
        </div>
    )
}