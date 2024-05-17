import React from 'react';
import styles from "./CommentSection.module.css";
import CommentForm from "./CommentForm";
import SingleComment from "./SingleComment";
import {useTranslation} from "react-i18next";

export default function CommentSection({comments, onCreate, allowCreate = true}) {

    const {t} = useTranslation();

    return (
        <div className={styles.CommentSection}>
            <h3>{t("comment:title")}</h3>
            {
                comments === null ?
                    t("comment:loading") :
                    comments.length === 0 ?
                        t("comment:noComments") :
                        comments.map(comment => <SingleComment comment={comment}
                                                               key={comment.id}
                                                               allowCreate={allowCreate}/>)
            }

            {
                allowCreate ? (
                    <CommentForm className={styles.addCommentForm} onCreate={onCreate} title={t("comment:create")}/>
                ) : null
            }
        </div>
    );
}
