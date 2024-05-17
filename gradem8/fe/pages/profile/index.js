import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "/store";
import btnStyles from '/styles/buttons.module.css';
import formStyles from '/styles/forms.module.css';
import RequireLogin from "/components/auth/RequireLogin";
import UsersAPI from "/lib/api/Users";
import Link from "next/link";
import Head from "next/head";

/**
 * Profile page (user view)
 * @returns {JSX.Element}
 */
export default function profilePage() {
    const {session, loading} = useGlobalContext();

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (session === null) return;
        UsersAPI.read(session.user.id, session.accessToken).then(setUser);
    }, [session]);


    return loading || (
        <RequireLogin redirect={true}>
            <Head>
                <title>Profile - GradeM8</title>
            </Head>
            <div className={formStyles.headerForm}>
                <h1>Profile</h1>
                <Link className={btnStyles.editBtn} href={`/profile/edit`}>Edit</Link>
            </div>
            {
                user === null ? <p>Loading...</p> : (
                    <>
                        <div className={formStyles.form}>
                            <span>ID:</span>
                            <span className={formStyles.description}>{user.id}</span>

                            <span>Username:</span>
                            <span className={formStyles.description}>{user.username}</span>

                            <span>First name:</span>
                            <span className={formStyles.description}>{user.firstName}</span>

                            <span>Last name:</span>
                            <span className={formStyles.description}>{user.lastName}</span>
                        </div>
                    </>
                )
            }
        </RequireLogin>
    );
}
