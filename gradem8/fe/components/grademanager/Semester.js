import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "../../store";
import SemestersAPI from "../../lib/api/Semesters";
import Subject from "./Subject";
import SubjectsAPI from "../../lib/api/Subjects";
import btnStyles from "/styles/buttons.module.css";
import formStyles from "/styles/forms.module.css";

/**
 * Component representing the main content in the semester page.
 * There will only ever be one such component on the page.
 * @param subject
 * @returns {JSX.Element}
 * @constructor
 */
export default function Semester({semester}) {
    const {session} = useGlobalContext();

    const [subjects, setSubjects] = useState(null);
    const [createSubjectFormShown, setCreateSubjectFormShown] = useState(false);

    useEffect(() => {
        if (session === null) return;
        updateSubjects();
    }, [session]);

    const updateSubjects = () => {
        SemestersAPI.readSubjects(semester.id, session.accessToken).then(setSubjects);
    }

    const submitAddSubjectForm = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const subjectName = formData.get("subjectname");
        SubjectsAPI.create({
            name: subjectName
        }, semester.id, session.accessToken).then(() => {
            updateSubjects();
            setCreateSubjectFormShown(false);
        });
    }


    return (
        subjects === null ? <p>Loading subjects...</p> : (
            <>
                <div>
                    {
                        subjects.length === 0 ? (
                            <p>No subjects yet. Create a new one:</p>
                        ) : (
                            subjects.sort((a, b) => a.name.localeCompare(b.name)).map(
                                s => <Subject subject={s} key={s.id} onUpdatedOrDeleted={updateSubjects}/>
                            )
                        )
                    }
                </div>
                {
                    createSubjectFormShown ? (
                        <form onSubmit={submitAddSubjectForm}>
                            <button className={btnStyles.cancelBtn} type="button"
                                    onClick={() => setCreateSubjectFormShown(false)}>
                                Cancel
                            </button>
                            <input className={formStyles.input} type="text" name="subjectname" required={true}
                                   minLength={2} maxLength={30} placeholder="Subject name"/>
                            <input className={btnStyles.createBtn} type="submit" value="Create"/>
                        </form>
                    ) : (
                        <form>
                            <button className={btnStyles.createBtn} type="button"
                                    onClick={() => setCreateSubjectFormShown(true)}>
                                Create Subject
                            </button>
                        </form>
                    )
                }
            </>
        )
    );
}
