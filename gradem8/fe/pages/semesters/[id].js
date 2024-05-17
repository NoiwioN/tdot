import RequireLogin from "../../components/auth/RequireLogin";
import {useGlobalContext} from "../../store";
import {useEffect, useState} from "react";
import SemestersAPI from "../../lib/api/Semesters";
import {useRouter} from "next/router";
import error404Page from "../404";
import Semester from "../../components/grademanager/Semester";
import btnStyles from "/styles/buttons.module.css";
import formStyles from "/styles/forms.module.css";
import Head from "next/head";

/**
 * Semester page
 * @returns {JSX.Element}
 */
export default function semesterPage() {
    const {session} = useGlobalContext();

    const router = useRouter();

    const [semester, setSemester] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [editFormShown, setEditFormShown] = useState(false);

    useEffect(() => {
        if (session === null || router.query.id === undefined) return;

        (async () => {
            const sem = await SemestersAPI.read(router.query.id, session.accessToken);
            if (sem === null) {
                setNotFound(true);
            } else {
                setSemester(sem);
            }
        })()
    }, [session, router]);

    const submitEditSemesterForm = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const semesterName = formData.get("semestername");

        const newSemester = {
            ...semester,
            name: semesterName
        }

        SemestersAPI.update(semester.id, newSemester, session.accessToken).then(() => {
            setEditFormShown(false);
            setSemester(newSemester);
        });
    }

    const deleteSemester = () => {
        if (!confirm("Are you sure that you want to delete this semester?")) return;
        SemestersAPI.delete(semester.id, session.accessToken).then(async () => {
            await router.push("/semesters");
        })
    }

    return (
        <RequireLogin redirect={true}>
            {
                notFound ? (
                    // Semester was not found; display 404 page
                    <>
                        <Head>
                            <title>Semester not found! - GradeM8</title>
                        </Head>
                        { error404Page() }
                    </>
                ) : (
                    <>
                        {
                            semester === null ? (
                                // Semester is still loading...
                                <>
                                    <Head>
                                        <title>Semester loading... - GradeM8</title>
                                    </Head>
                                    <p>Loading...</p>
                                </>
                            ) : (
                                // Semester loaded; show heading & <Semester/> component
                                <>
                                    <Head>
                                        <title>Semester: {semester.name} - GradeM8</title>
                                    </Head>
                                    {
                                        editFormShown ? (
                                            <form className={formStyles.headerForm} onSubmit={submitEditSemesterForm}>
                                                <h1>Semester: {semester.name}</h1>
                                                <button className={btnStyles.cancelBtn} type="button"
                                                        onClick={() => setEditFormShown(false)}>
                                                    Cancel
                                                </button>
                                                <input type="text" name="semestername" required={true}
                                                       minLength={2} maxLength={30}
                                                       defaultValue={semester.name} placeholder="Semester name"/>
                                                <div>
                                                    <button className={btnStyles.createBtn} type="submit">
                                                        Submit
                                                    </button>
                                                    <button className={btnStyles.deleteBtn} type="button"
                                                            value="Delete" onClick={deleteSemester}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <form className={formStyles.headerForm}>
                                                <h1>Semester: {semester.name}</h1>
                                                <button className={btnStyles.editBtn} type="button"
                                                        onClick={() => setEditFormShown(true)}>
                                                    Edit Semester
                                                </button>
                                            </form>
                                        )
                                    }
                                    <Semester semester={semester}/>
                                </>
                            )
                        }
                    </>
                )
            }
        </RequireLogin>
    );
}
