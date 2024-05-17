import React, {useEffect, useState} from 'react';
import LabelledValidatedInput from "/components/LabelledValidatedInput";
import headerStyles from "/styles/forms.module.css";
import CantonsAPI from "../lib/api/Cantons";
import {useTranslation} from "react-i18next";


/**
 * Profile form (Create or edit user)
 *
 * Does not submit anything to the API!
 * @param onSubmit function called on submit of the form with the new user object
 * @param isEditing if there is already a user that is being edited ("sign up" mode if false)
 * @param oldUser the old user object (optional)
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProfileForm({onSubmit, isEditing, oldUser = {}}) {
    const [passwordRepeatValidationErrorMessage, setPasswordRepeatValidationErrorMessage] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cantons, setCantons] = useState(null);
    const {t} = useTranslation()

    useEffect(() => {
        CantonsAPI.readAll().then(setCantons);
    }, []);

    const validatePW = (formElem) => {
        const formData = new FormData(formElem);
        const password = formData.get("password");
        const password2 = formData.get("password2");

        if (password !== password2) {
            setPasswordRepeatValidationErrorMessage(t("profileForm:pwError"));
            return false;
        } else {
            setPasswordRepeatValidationErrorMessage("");
            return true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!validatePW(e.target)) return;

        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const newUserData = {
            username: formData.get("username"),
            firstName: formData.get("firstname"),
            lastName: formData.get("lastname"),
            city: formData.get("city"),
            password: formData.get("password"),
            canton: {id: formData.get("canton")}
        }

        onSubmit(newUserData).catch(err => {
            setIsSubmitting(false);
            console.warn("Error caught: ", err);
        });
    }

    return (<form className={headerStyles.form} onSubmit={handleSubmit}>
        <LabelledValidatedInput name="username"
                                label="Benutzername:"
                                required={true}
                                defaultValue={oldUser.username}/>
        <LabelledValidatedInput name="firstname"
                                label="Vorname:"
                                required={false}
                                defaultValue={oldUser.firstName}/>
        <LabelledValidatedInput name="lastname"
                                label="Nachname:"
                                required={false}
                                defaultValue={oldUser.lastName}/>
        <LabelledValidatedInput name="city"
                                label="Stadt:"
                                required={true}
                                defaultValue={oldUser.city}/>
        {
            cantons === null ? (
                <LabelledValidatedInput name="canton"
                                        label="Kanton:"
                                        readOnly={true}
                                        required={true}
                                        value="Laden..."/>
            ) : cantons.length === 0 ? (
                <LabelledValidatedInput name="canton"
                                        label="Kanton:"
                                        readOnly={true}
                                        required={true}
                                        value={t("profileForm:cantonError")}/>
            ) : (
                <LabelledValidatedInput type="select"
                                        name="canton"
                                        label="Kanton:"
                                        required={true}
                                        defaultValue={oldUser.canton ? oldUser.canton.id : null}>
                    {
                        cantons.map(canton => <option value={canton.id} key={canton.id}>{canton.name}</option>)
                    }
                </LabelledValidatedInput>
            )
        }
        <LabelledValidatedInput type="password"
                                name="password"
                                label={isEditing ? t('profileForm:newPw') : t('profileForm:pw')}
                                required={true}
                                onInput={e => validatePW(e.target.form)}/>
        <LabelledValidatedInput type="password" name="password2"
                                label={isEditing ? t('profileForm:repeatNewPw') : t('profileForm:repeatPw')}
                                required={true} onInput={e => validatePW(e.target.form)}/>

        {passwordRepeatValidationErrorMessage &&
            <p className={headerStyles.globalError}>{passwordRepeatValidationErrorMessage}</p>}

        <button className={headerStyles.updateBtn} disabled={isSubmitting}>
            {isSubmitting ? t("profileForm:loading") : isEditing ? t("profileForm:update") : t("login:signup")}
        </button>
    </form>);
}
