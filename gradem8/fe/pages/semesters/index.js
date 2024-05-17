import RequireLogin from "../../components/auth/RequireLogin";
import {useGlobalContext} from "../../store";
import UsersAPI from "../../lib/api/Users";
import {useEffect, useState} from "react";
import Link from "next/link";
import displayStyles from './index.module.css';
import styles from './index.module.css';
import btnStyles from "/styles/buttons.module.css";
import formStyles from "/styles/forms.module.css";
import SemestersAPI from "../../lib/api/Semesters";
import Head from "next/head";

/**
 * Semester overview page
 * @returns {JSX.Element}
 */
export default function semestersPage() {
    const {session} = useGlobalContext();

    const [semesters, setSemesters] = useState(null);
    const [createFormShown, setCreateFormShown] = useState(false);

    useEffect(() => {
        if (session === null) return;
        updateSemesters();
    }, [session]);

    const updateSemesters = () => {
        UsersAPI.readSemesters(session.user.id, session.accessToken).then(setSemesters);
    }

    const submitAddSemesterForm = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const semesterName = formData.get("semestername");
        SemestersAPI.create({
            name: semesterName
        }, session.user.id, session.accessToken).then(() => {
            setCreateFormShown(false);
            updateSemesters();
        });
    }

    return (
        <div className={displayStyles.semesterDisplay}>
            <Head>
                <title>Semester overview - GradeM8</title>
            </Head>
            <RequireLogin redirect={true}>
                {
                    createFormShown ? (
                        <form className={formStyles.headerForm} onSubmit={submitAddSemesterForm}>
                            <h1>Semesters</h1>
                            <button className={btnStyles.cancelBtn} type="button"
                                    onClick={() => setCreateFormShown(false)}>
                                Cancel
                            </button>
                            <input type="text" name="semestername" required={true} minLength={2} maxLength={30} placeholder="Semester name"/>
                            <input className={btnStyles.createBtn} type="submit" value="Create"/>
                        </form>
                    ) : (
                        <form className={formStyles.headerForm}>
                            <h1>Semesters</h1>
                            <button className={btnStyles.createBtn} type="button" onClick={() => setCreateFormShown(true)}>
                                Create Semester
                            </button>
                        </form>
                    )
                }
                {
                    semesters === null ? (
                        // Semesters are still loading...
                        <p>Loading...</p>
                    ) : (
                        semesters.length === 0 ? (
                            // Semesters loaded but empty
                            <p>No semesters found</p>
                        ) : (
                            // Semesters loaded and not empty
                            <div className={styles.semesterView}>
                                {semesters.sort((a, b) => a.name.localeCompare(b.name)).map(semester => (
                                    <Link className={styles.semesterBlock} href={`/semesters/${semester.id}`}
                                          key={semester.id}>
                                        {/*Semester:*/} {semester.name}
                                    </Link>
                                ))}
                            </div>
                        )
                    )
                }
            </RequireLogin>
        </div>
    );
}
