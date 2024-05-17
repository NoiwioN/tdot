import React, {useState} from 'react';
import styles from "./SingleComment.module.css";
import CommentsAPI from "../../lib/api/Comments";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faComments} from "@fortawesome/free-solid-svg-icons";
import CommentForm from "./CommentForm";
import {useGlobalContext} from "../../store";

export default function SingleComment({comment, allowCreate = true}) {
    const [subcomments, setSubcomments] = useState(null);
    const [subcommentsShown, setSubcommentsShown] = useState(false);
    const [newCommentFormShown, setNewCommentFormShown] = useState(false);

    const {session} = useGlobalContext();

    const toggleCommentForm = () => {
        setNewCommentFormShown(!newCommentFormShown);
    }

    const toggleSubcomments = () => {
        if (subcommentsShown) {
            setSubcommentsShown(false);
        } else {
            fetchSubcomments();
            setSubcommentsShown(true);
        }
    }

    const fetchSubcomments = () => {
        CommentsAPI.readSubcomments(comment.id).then(setSubcomments);
    }

    const onCreate = async (newComment) => {
        await CommentsAPI.createSubcomment(newComment, comment.id, session.user.id, session.accessToken);
        setNewCommentFormShown(false);
        fetchSubcomments();
    }


    return (
        <div className={styles.Comment}>
            <div className={styles.headingRow}>
                <img className={styles.commenterCantonIcon}
                     src={`/coatOfArms/${comment.user.canton.id.toLowerCase()}.png`}
                     alt={`Coat of Arms of ${comment.user.canton.name}`}/>
                <h5 className={styles.commenterName}>
                    {comment.user.firstName} {comment.user.lastName} ({comment.user.username})
                </h5>
            </div>
            <p className={styles.commentText}>
                {comment.content}
            </p>
            <div className={styles.buttonRow}>
                <FontAwesomeIcon icon={faComments} onClick={toggleSubcomments}/>
            </div>
            {
                subcommentsShown ? (
                    <>
                        <hr/>
                        {
                            allowCreate ? (
                                <>
                                    <div className={styles.answerButtonRow}>
                                        <span>Jetzt antworten:</span>
                                        <FontAwesomeIcon icon={faComment} onClick={toggleCommentForm}/>
                                    </div>
                                    {
                                        newCommentFormShown ? (
                                            <CommentForm onCreate={onCreate} className={styles.answerForm}/>
                                        ) : null
                                    }
                                </>
                            ) : null
                        }
                        {
                            subcomments === null ? <p>Antworten laden...</p> : (
                                subcomments.length === 0 ? null : (
                                    subcomments.map(subcomment => <SingleComment comment={subcomment}
                                                                                 key={subcomment.id}
                                                                                 allowCreate={allowCreate}/>)
                                )
                            )
                        }
                    </>
                ) : null
            }
        </div>
    );
}
