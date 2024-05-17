import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "/store";
import btnStyles from '/styles/buttons.module.css';
import formStyles from '/styles/forms.module.css';
import coatStyle from '/styles/coats.module.css';
import RequireLogin from "/components/auth/RequireLogin";
import UsersAPI from "/lib/api/Users";
import Link from "next/link";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import UserFeedbacks from "../../components/feedbacks/UserFeedbacks";

/**
 * Profile page (user view)
 * @returns {JSX.Element}
 */
export default function profilePage() {
    const {session, loading} = useGlobalContext();

    const [user, setUser] = useState(null);
    const {t} = useTranslation()

    useEffect(() => {
        if (session === null) return;
        UsersAPI.read(session.user.id, session.accessToken).then(setUser);
    }, [session]);


    return loading || (
        <RequireLogin redirect={true}>
            <Head>
                <title>Profile - SwissView</title>
            </Head>
            <div className={formStyles.headerForm}>
                <h1>{t("profileForm:profile")}</h1>
                <Link className={btnStyles.editBtn} href={`/profile/edit`}>{t("profileForm:editTitle")}</Link>
                {
                    user === null ? <p>Wappen</p>: <img className={coatStyle.profile} src={`/coatOfArms/${user.canton.id.toLowerCase()}.png`} alt={"Wappen"}/>
                }

            </div>
            {
                user === null ? <p>Loading...</p> : (
                    <>
                        <div className={formStyles.form}>
                            {/*<span>ID:</span>
                            <span className={formStyles.description}>{user.id}</span>*/}
                            <span>Vorname:</span>
                            <span className={formStyles.description}>{user.firstName}</span>

                            <span>Nachname:</span>
                            <span className={formStyles.description}>{user.lastName}</span>

                            <span>Username:</span>
                            <span className={formStyles.description}>{user.username}</span>

                            <span>Wohnort:</span>
                            <span className={formStyles.description}>{user.city}</span>

                            <span>Kanton:</span>
                            <span className={formStyles.description}>{user.canton.name}</span>

                        </div>
                    </>
                )
            }
            <UserFeedbacks user={session.user}/>
        </RequireLogin>
    );
}
