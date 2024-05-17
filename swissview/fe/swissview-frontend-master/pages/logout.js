import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useGlobalContext} from "/store";
import {toast} from "react-toastify";
import Head from "next/head";

/**
 * Logout page. Will log the user out, show a toast and redirect to the home page.
 * The toast will also show if the user was already logged out.
 * @returns {JSX.Element}
 */
export default function loginPage() {
    const {logout, session, loading} = useGlobalContext();

    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (session !== null) {
            logout();
            router.push("/").then(() => toast.success("You're now logged out!"));
        } else {
            router.push("/").then(() => toast.warning("You were already logged out!"));
        }
    }, [loading]);

    return (
        <Head>
            <title>Logout - SwissView</title>
        </Head>
    );
}
