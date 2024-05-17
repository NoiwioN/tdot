import React, {useState} from 'react';
import formStyles from "/styles/forms.module.css";
import btnStyles from "/styles/buttons.module.css";
import styles from "./FeedbackForm.module.css";
import FeedbackFlag from "./FeedbackFlag";
import {useTranslation} from "react-i18next";

formStyles.slider = undefined;
export default function FeedbackForm({onCreate, className, title = null}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [amount, setAmount] = useState(5);

    const {t} = useTranslation();

    const handleSliderChange = (event) => {
        setAmount(event.target.value);
    };


    const handleSubmit = e => {
        e.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const newFeedbackData = {
            title: formData.get("title"),
            description: formData.get("description"),
            points: formData.get("points")

        }

        onCreate(newFeedbackData).then(() => {
            setIsSubmitting(false);
            e.target.reset();
        }).catch(err => {
            setIsSubmitting(false);
            console.warn("Error caught: ", err);
        });
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            {title ? <h5 className={styles.title}>{title}</h5> : null}
            <div className={styles.sliderContainer}>
                <FeedbackFlag points={amount}/>
                <input type="range"
                       name="points"
                       min="0"
                       max="10"
                       defaultValue="5"
                       onChange={handleSliderChange}
                />
            </div>
            <textarea className={`${formStyles.input} ${formStyles.noMargins}`}
                      name="title"
                      rows={1}
                      placeholder={t("feedback:feedbackTitel")}
                      required={true}
                      minLength={3}/>
            <textarea className={`${formStyles.input} ${formStyles.noMargins}`}
                      name="description"
                      rows={3}
                      placeholder={t("feedback:placeholder")}
                      required={true}
                      minLength={3}/>
            <input className={`${btnStyles.createBtn} ${formStyles.noMargins}`}
                   name="points"
                   type="submit"
                   value={isSubmitting ? t("feedback:preRelease") : t("feedback:release")}
                   disabled={isSubmitting}/>
        </form>
    );
}