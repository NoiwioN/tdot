import React from 'react';
import styles from "./SingleFeedback.module.css";
import FeedbackFlag from "./FeedbackFlag";
import {useRouter} from "next/router";

export default function SingleFeedback({feedback}) {

    const router = useRouter();

    let route = router.route

    return (
        <div className={styles.Feedback}>
            <div className={styles.headingRow}>
                <img className={styles.feedbackerCantonIcon}
                    src={route === "/profile" ? `/coatOfArms/${feedback.canton.id.toLowerCase()}.png` : `/coatOfArms/${feedback.user.canton.id.toLowerCase()}.png`}
                    alt={`Coat of Arms of ${feedback.user.canton.name}`}/>
                <h5 className={styles.feedbackerName}>
                    {route === "/profile" ? `${feedback.canton.name}` : `${feedback.user.firstName} ${feedback.user.lastName} (${feedback.user.username})`}
                </h5>
            </div>
            <FeedbackFlag points={feedback.points} />
            <h4 className={styles.feedbackerText}>
                {feedback.title}
            </h4>
            <p className={styles.feedbackerText}>
                {feedback.description}
            </p>

        </div>
    );
}