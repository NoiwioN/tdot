import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "/store";
import RequireLogin from "/components/auth/RequireLogin";
import UsersAPI from "/lib/api/Users";
import {useRouter} from "next/router";
import ProfileForm from "/components/ProfileForm";
import headerStyles from "/styles/forms.module.css"
import btnStyles from "../../styles/buttons.module.css";
import Link from "next/link";
import Head from "next/head";
import {useTranslation} from "react-i18next";

/**
 * Profile edit page (user edit)
 * @returns {JSX.Element}
 */
export default function editPage() {
    const {session, loading} = useGlobalContext();

    const router = useRouter();

    const [user, setUser] = useState(null);
    const{t} = useTranslation()

    useEffect(() => {
        if (session === null) return;
        UsersAPI.read(session.user.id, session.accessToken).then(setUser);
    }, [session]);

    const postUpdate = async (newUserData) => {
        await UsersAPI.update(session.user.id, newUserData, session.accessToken);
        await router.push("/profile");
    }
    const handleDelete = () => {
        if (!(confirm("Are you sure that you want to delete your account?") &&
            confirm("Are you REALLY SURE? Your account will be lost forever (a very long time)!") &&
            confirm("Just to be sure... Are you sure?") &&
            confirm("This is the last warning. We won't be able to help you if you click 'ok' now."))) return;
        UsersAPI.delete(session.user.id, session.accessToken).then(
            async () => {
                await router.push("/logout")
            }
        )
    }
    return loading || (
        <RequireLogin redirect={true}>
            <Head>
                <title>{t("profileForm:editTitle")} - SwissView</title>
            </Head>
            <div className={headerStyles.headerForm}>
                <h1>{t("profileForm:editTitle")}</h1>
                <Link className={btnStyles.editBtn} href={`../profile`}>{t("profileForm:cancel")}</Link>
            </div>
            {
                user === null ? <p>Loading...</p> : (
                    <>
                        <ProfileForm onSubmit={postUpdate} isEditing={true} oldUser={user}/>
                        <a className={btnStyles.deleteBtn} onClick={handleDelete}>{t("profileForm:deleteProfile")}</a>
                    </>
                )
            }
        </RequireLogin>
    );
}
