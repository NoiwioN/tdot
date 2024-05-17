import React from 'react';
import btnStyles from "/styles/buttons.module.css";
import formStyles from "/styles/forms.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

export default function GradeForm({prefilledData = {}, onSubmit, onCancel}) {

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newGrade = {
            ...prefilledData,
            value: formData.get("value"),
            weight: formData.get("weight"),
            description: formData.get("description"),
            date: formData.get("date"),
        }

        onSubmit(newGrade);
    }

    return (
        <form style={{display: "contents"}} onSubmit={handleSubmit}>
            <input className={`${formStyles.input} ${formStyles.noMargins}`} type="number" name="value"
                   min={1} max={6} step={0.00001}
                   defaultValue={prefilledData.value} placeholder="Value"/>
            <input className={`${formStyles.input} ${formStyles.noMargins}`} type="number" name="weight"
                   min={0} max={1} step={0.00001}
                   defaultValue={prefilledData.weight} placeholder="Weight"/>
            <input className={`${formStyles.input} ${formStyles.noMargins}`} type="text" name="description"
                   required={true}
                   minLength={5} maxLength={100}
                   defaultValue={prefilledData.description} placeholder="Description"/>
            <input className={`${formStyles.input} ${formStyles.noMargins}`} type="date" name="date"
                   defaultValue={prefilledData.date} placeholder="Date"/>
            <button className={`${btnStyles.createBtn} ${formStyles.noMargins}`} type="submit">
                <FontAwesomeIcon icon={faCheck}/>
            </button>
            <button className={`${btnStyles.cancelBtn} ${formStyles.noMargins}`} type="button" onClick={onCancel}>
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </form>
    );
}
