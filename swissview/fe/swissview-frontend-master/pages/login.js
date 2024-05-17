import React, {useEffect, useState} from 'react';
import styles from '/styles/forms.module.css';
import formstyle from "/styles/forms.module.css"
import styles2 from "./index.module.css";
import UsersAPI from "/lib/api/Users";
import {useRouter} from "next/router";
import {useGlobalContext} from "/store";
import LabelledValidatedInput from "/components/LabelledValidatedInput";
import {toast} from "react-toastify";
import Link from "next/link";
import Head from "next/head";
import {useTranslation} from "react-i18next";

/**
 * Login page
 * @returns {JSX.Element}
 */
export default function loginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const {login, session, loading} = useGlobalContext();
    const {t} = useTranslation()

    useEffect(() => {
        if (loading) return;

        if (session !== null) {
            router.push("/").then(() =>
                toast.warn("Already logged in!")
            )
        }
    }, [loading]);

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");

        setIsSubmitting(true);
        const userData = {username, password};
        UsersAPI.login(userData).then(async response => {
            if (!response.accessToken) {
                toast.error("Login failed! Backend returned no access token!");
                return;
            }

            const session = {
                accessToken: response.accessToken,
                user: await UsersAPI.readByUsername(username, response.accessToken),
            }
            login(session);
            await router.push("/");
        }).catch(err => {
            setIsSubmitting(false);
            console.warn("Login failed: ", err)
        });
    }

    return (
        <div>
            <Head>
                <title>Login - SwissView</title>
            </Head>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <LabelledValidatedInput type="text"
                                        name="username"
                                        label="Benutzername: "
                                        required={true}/>
                <LabelledValidatedInput type="password"
                                        name="password"
                                        label="Passwort: "
                                        required={true}/>

                <button className={formstyle.updateBtn} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Login"}
                </button>
            </form>
            {t('login:register')}
            <Link href="/register" className={styles2.signUpBtnLogin}>
                <i>{t('login:signup').toUpperCase()}</i>
            </Link>
        </div>
    );
}
