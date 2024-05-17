import React, {useEffect, useState} from 'react'
import UsersAPI from "../../lib/api/Users";
import FeedbackSection from "./FeedbackSection";
import {useGlobalContext} from "../../store";

export default function UserFeedbacks({user}) {
    const [rootFeedbacks, setRootFeedbacks] = useState(null);

    const {session} = useGlobalContext();

    useEffect(() => {
        fetchFeedbacks()
    }, []);

    const fetchFeedbacks = async () => {
        UsersAPI.readFeedbacks(user.id).then(feedbacks => {
            setRootFeedbacks(feedbacks);
        })
    }

    return (
        <FeedbackSection feedbacks={rootFeedbacks}/>
    );
}