import React, {useState} from 'react';
import formStyles from "/styles/forms.module.css";
import btnStyles from "/styles/buttons.module.css";
import styles from "./CommentForm.module.css";
import {useTranslation} from "react-i18next";

export default function CommentForm({onCreate, className, title = null}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {t} = useTranslation();

    const handleSubmit = e => {
        e.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const newCommentData = {
            content: formData.get("content"),
        }

        onCreate(newCommentData).then(() => {
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
            <textarea className={`${formStyles.input} ${formStyles.noMargins}`}
                      name="content"
                      rows={3}
                      placeholder={t("comment:placeholder")}
                      required={true}
                      minLength={3}/>
            <input className={`${btnStyles.createBtn} ${formStyles.noMargins}`}
                   type="submit"
                   value={isSubmitting ? t("comment:preRelease") : t("comment:release")}
                   disabled={isSubmitting}/>
        </form>
    );
}
