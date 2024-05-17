import React, {useEffect} from 'react';
import UsersAPI from "/lib/api/Users";
import {useRouter} from "next/router";
import ProfileForm from "/components/ProfileForm";
import Head from "next/head";
import {toast} from "react-toastify";
import {useGlobalContext} from "../store";

/**
 * Registration page
 * @returns {JSX.Element}
 */
export default function Register() {
    const router = useRouter();

    const {session, loading} = useGlobalContext();

    useEffect(() => {
        if (loading) return;

        if (session !== null) {
            router.push("/").then(() =>
                toast.warn("Already logged in!")
            )
        }
    }, [loading]);

    const postCreate = async (userData) => {
        await UsersAPI.create(userData);
        await router.push("/login");
    }

    return (
        <div>
            <Head>
                <title>Register - GradeM8</title>
            </Head>
            <h1>Register</h1>
            <ProfileForm onSubmit={postCreate} isEditing={false}/>
        </div>
    );
}
