import React, {useEffect, useState} from 'react';
import LabelledValidatedInput from "/components/LabelledValidatedInput";
import headerStyles from "/styles/forms.module.css";
import CantonsAPI from "../../lib/api/Cantons";
import {useTranslation} from "react-i18next";


/**
 * Event form (Create or edit event)
 *
 * Does not submit anything to the API!
 * @param onSubmit function called on submit of the form with the new event object
 * @param isEditing if there is already a event that is being edited
 * @param oldEvent the old event object (optional)
 * @returns {JSX.Element}
 * @constructor
 */
export default function EventForm({onSubmit, isEditing, oldUser: oldEvent = {}}) {
    const [dateValidationMessage, setDateValidationMessage] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cantons, setCantons] = useState(null);
    const {t} = useTranslation()

    useEffect(() => {
        CantonsAPI.readAll().then(setCantons);
    }, []);

    const validateDates = (formElem) => {
        const formData = new FormData(formElem);
        const startTime = formData.get("startTime");
        const endTime = formData.get("endTime");

        if (new Date(startTime) > new Date(endTime)) {
            setDateValidationMessage(t("events:dateValidationFailed"));
            return false;
        } else {
            setDateValidationMessage("");
            return true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!validateDates(e.target)) return;

        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const newEventData = {
            title: formData.get("title"),
            description: formData.get("description"),
            url: formData.get("url"),
            startTime: formData.get("startTime"),
            endTime: formData.get("endTime"),
            location: formData.get("location"),
            canton: {id: formData.get("canton")}
        }

        onSubmit(newEventData).catch(err => {
            setIsSubmitting(false);
            console.warn("Error caught: ", err);
        });
    }

    return (<form className={headerStyles.form} onSubmit={handleSubmit}>
        <LabelledValidatedInput name="title"
                                label={t("events:title")}
                                required={true}
                                defaultValue={oldEvent.title}/>
        <LabelledValidatedInput name="description"
                                label={t("events:description")}
                                required={true}
                                defaultValue={oldEvent.description}/>
        <LabelledValidatedInput type="url"
                                name="url"
                                label={t("events:url")}
                                required={false}
                                defaultValue={oldEvent.url}/>
        <LabelledValidatedInput name="location"
                                label={t("events:location")}
                                required={false}
                                defaultValue={oldEvent.location}/>
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
                                        value={t("events:cantonError")}/>
            ) : (
                <LabelledValidatedInput type="select"
                                        name="canton"
                                        label="Kanton:"
                                        required={true}
                                        defaultValue={oldEvent.canton ? oldEvent.canton.id : null}>
                    {
                        cantons.map(canton => <option value={canton.id} key={canton.id}>{canton.name}</option>)
                    }
                </LabelledValidatedInput>
            )
        }
        <LabelledValidatedInput type="datetime-local"
                                name="startTime"
                                label={t("events:startTime")}
                                required={true}
                                defaultValue={oldEvent.startTime}
                                onInput={e => validateDates(e.target.form)}/>
        <LabelledValidatedInput type="datetime-local"
                                name="endTime"
                                label={t('events:endTime')}
                                required={true}
                                defaultValue={oldEvent.endTime}
                                onInput={e => validateDates(e.target.form)}/>

        {dateValidationMessage &&
            <p className={headerStyles.globalError}>{dateValidationMessage}</p>}

        <button className={headerStyles.updateBtn} disabled={isSubmitting}>
            {isSubmitting ? t("events:loading") : isEditing ? t("events:update") : t("events:create")}
        </button>
    </form>);
}
