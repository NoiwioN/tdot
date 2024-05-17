import React, {useState} from 'react';
import {useRouter} from "next/router";
import {useGlobalContext} from "/store";
import {toast} from "react-toastify";

export default function RequireLogin({children, redirect = false, requireAdmin = false}) {
    const router = useRouter();

    const [didRedirectAndWarn, setDidRedirectAndWarn] = useState(false);

    const {session, loading} = useGlobalContext();

    if (loading || !router.isReady) {
        return <p>Loading...</p>;
    }

    if (session === null) {
        if (redirect && !didRedirectAndWarn) {
            setDidRedirectAndWarn(true);
            router.push("/login").then(() => {
                toast.warn("Login is required to visit this page!");
            });
        }
        return <></>;
    } else if (requireAdmin && !session.user.admin) {
        if (redirect && !didRedirectAndWarn) {
            setDidRedirectAndWarn(true);
            router.push("/").then(() => {
                toast.warn("Admin privileges are required to access this page!");
            });
        }
        return <></>;
    } else {
        return children;
    }
}
