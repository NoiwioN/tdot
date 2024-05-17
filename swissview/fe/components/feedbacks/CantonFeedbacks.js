import React, {useEffect, useState} from 'react'
import CantonsAPI from "../../lib/api/Cantons";
import FeedbackSection from "./FeedbackSection";
import FeedbacksAPI from "../../lib/api/Feedbacks";
import {useGlobalContext} from "../../store";


export default function CantonFeedbacks({canton}) {
    const [rootFeedbacks, setRootFeedbacks] = useState(null);
    const [existingFeedback, setExistingFeedback] = useState(false);

    const {session} = useGlobalContext();

    useEffect(() => {
        fetchFeedbacks()
    }, []);

    const fetchFeedbacks = async () => {
        CantonsAPI.readFeedbacks(canton.id).then(feedbacks => {
            setRootFeedbacks(feedbacks);
            for (let feedback of feedbacks) {
                if (session && session.user && feedback.user.id === session.user.id) {
                    setExistingFeedback(true)
                }
            }
        })
    }

    const handleAddFeedback = async (feedback) => {
        await FeedbacksAPI.create(feedback, canton.id, session.user.id, session.accessToken);
        await fetchFeedbacks();
    }

    return (
        <FeedbackSection feedbacks={rootFeedbacks}
                         onCreate={handleAddFeedback}
                         allowCreate={session !== null && existingFeedback === false}/>
    );
}