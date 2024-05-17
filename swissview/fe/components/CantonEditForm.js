import React, {useState} from 'react';
import LabelledValidatedInput from "/components/LabelledValidatedInput";
import headerStyles from "/styles/forms.module.css";
import CantonsAPI from "../lib/api/Cantons";
import {useTranslation} from "react-i18next";
import {useGlobalContext} from "../store";
import {useRouter} from "next/router";


/**
 * Canton form (edit canton, admins only)
 * @returns {JSX.Element}
 * @constructor
 */
export default function CantonEditForm({canton}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {session} = useGlobalContext();

    const router = useRouter();

    const {t} = useTranslation();

    const handleSubmit = e => {
        e.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const newCantonData = {
            id: canton.id,
            name: formData.get("name"),
            population: formData.get("population"),
            joinYear: formData.get("joinYear"),
            area: formData.get("area"),
            language: formData.get("language"),
            capital: formData.get("capital")
        }

        CantonsAPI.update(canton.id, newCantonData, session.accessToken).then( () =>
            router.push(`/cantons/${canton.id}`)
        ).catch(err => {
            setIsSubmitting(false);
            console.warn("Error caught: ", err);
        })
    }

    return (
        <form className={headerStyles.form} onSubmit={handleSubmit}>
            <LabelledValidatedInput name="name"
                                    label={t("cantonDetails:name")}
                                    required={true}
                                    maxLength={25}
                                    defaultValue={canton.name}/>
            <LabelledValidatedInput type="number"
                                    name="population"
                                    label={t("cantonDetails:population")}
                                    min={0}
                                    required={true}
                                    defaultValue={canton.population}/>
            <LabelledValidatedInput type="number"
                                    name="joinYear"
                                    label={t("cantonDetails:joinYear")}
                                    required={false}
                                    defaultValue={canton.joinYear}/>
            <LabelledValidatedInput type="number"
                                    name="area"
                                    label={t("cantonDetails:area")}
                                    required={true}
                                    defaultValue={canton.area}/>
            <LabelledValidatedInput name="language"
                                    label={t('cantonDetails:language')}
                                    required={true}
                                    maxLength={100}
                                    defaultValue={canton.language}/>
            <LabelledValidatedInput name="capital"
                                    label={t('cantonDetails:capital')}
                                    required={true}
                                    maxLength={100}
                                    defaultValue={canton.capital}/>

            <button className={headerStyles.updateBtn} disabled={isSubmitting}>
                {isSubmitting ? t("cantonDetails:loading") : t("cantonDetails:update")}
            </button>
        </form>
    );
}
