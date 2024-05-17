import React from 'react';
import {useRouter} from "next/router";
import {useGlobalContext} from "/store";
import {toast} from "react-toastify";

export default function RequireLogin({children, redirect = false}) {
    const router = useRouter();

    const {session, loading} = useGlobalContext();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (session === null) {
        if (redirect && router.isReady) {
            router.push("/login").then(() => {
                toast.warn("Login is required to visit this page!");
            });
            return <></>;
        } else {
            return <></>;
        }
    } else {
        return children;
    }
}
