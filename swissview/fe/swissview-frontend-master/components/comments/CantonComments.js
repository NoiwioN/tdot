import React, {useEffect, useState} from 'react';
import CantonsAPI from "../../lib/api/Cantons";
import CommentSection from "./CommentSection";
import CommentsAPI from "../../lib/api/Comments";
import {useGlobalContext} from "../../store";

export default function CantonComments({canton}) {
    const [rootComments, setRootComments] = useState(null);

    const {session} = useGlobalContext();

    useEffect(() => {
        fetchComments()
    }, []);

    const fetchComments = async () => {
        CantonsAPI.readComments(canton.id).then(comments => {
            setRootComments(comments);
        });
    }

    const handleAddComment = async (comment) => {
        await CommentsAPI.createInCanton(comment, canton.id, session.user.id, session.accessToken);
        await fetchComments();
    }

    return (
        <CommentSection comments={rootComments}
                        onCreate={handleAddComment}
                        allowCreate={session !== null}
                        includeSubcomments={true}/>
    );
}
