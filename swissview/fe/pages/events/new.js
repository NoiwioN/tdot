import React from 'react';
import {useRouter} from "next/router";
import Head from "next/head";
import {useGlobalContext} from "/store";
import {useTranslation} from "react-i18next";
import EventForm from "../../components/events/EventForm";
import RequireLogin from "../../components/auth/RequireLogin";
import EventsAPI from "../../lib/api/Events";
import formStyles from "../../styles/forms.module.css";
import Link from "next/link";
import btnStyles from "../../styles/buttons.module.css";

/**
 * Registration page
 * @returns {JSX.Element}
 */
export default function Register() {
    const router = useRouter();

    const {session} = useGlobalContext();
    const {t} = useTranslation()

    const postCreate = async (eventData) => {
        await EventsAPI.create(eventData, session.user.id, session.accessToken);
        await router.push("/events");
    }

    return (
        <RequireLogin requireAdmin={true} redirect={true}>
            <Head>
                <title>{t("events:createTitle")} - SwissView</title>
            </Head>
            <div className={formStyles.headerForm}>
                <h1>{t("events:createTitle")}</h1>
                <Link className={btnStyles.cancelBtn} href={`/events`}>{t("events:cancel")}</Link>
            </div>
            <EventForm onSubmit={postCreate} isEditing={false}/>
        </RequireLogin>
    );
}
