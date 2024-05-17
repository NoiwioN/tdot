import React from 'react';
import SingleFeedback from "./SingleFeedback";
import FeedbackForm from "./FeedbackForm";
import styles from "./FeedbackSection.module.css";
import {useTranslation} from "react-i18next";

export default function FeedbackSection({feedbacks, onCreate, allowCreate = false}) {

    const {t} = useTranslation();

    return (
        <div className={styles.FeedbackSection}>
            <h3>{t("feedback:title")}</h3>
                {
                    feedbacks === null ?
                        t("feedback:loading") :
                            feedbacks.length === 0 ?
                                t("feedback:noFeedback") :
                                feedbacks.map(feedback => <SingleFeedback feedback={feedback}
                                                                          key={feedback.id}
                                                                          allowCreate={allowCreate}/>)
                }
                {
                    allowCreate ? (
                        <FeedbackForm className={styles.addFeedbackForm} onCreate={onCreate} title={t("feedback:create")} />
                    ) : null
                }
        </div>
    )
}