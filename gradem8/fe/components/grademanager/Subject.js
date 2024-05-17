import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "/store";
import SubjectsAPI from "/lib/api/Subjects";
import Grade from "./Grade";
import styles from "./Subject.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faChevronDown,
    faChevronUp,
    faPenToSquare,
    faTrash,
    faXmark,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import {averageGrade} from "/lib/utils/gradeutils";
import btnStyles from "/styles/buttons.module.css";
import formStyles from "/styles/forms.module.css";
import GradeForm from "./GradeForm";
import GradesAPI from "/lib/api/Grades";


/**
 * Component representing a subject block in the semester page
 * @param subject
 * @param onUpdatedOrDeleted
 * @returns {JSX.Element}
 * @constructor
 */
export default function Subject({subject, onUpdatedOrDeleted}) {
    const {session} = useGlobalContext();

    const [grades, setGrades] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editFormShown, setEditFormShown] = useState(false);
    const [createGradeFormShown, setCreateGradeFormShown] = useState(false);

    useEffect(() => {
        updateGrades();
    }, []);


    const updateGrades = () => {
        SubjectsAPI.readGrades(subject.id, session.accessToken).then(setGrades);
    }

    const submitEditSubjectForm = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const subjectName = formData.get("subjectname");

        const newSubject = {
            ...subject,
            name: subjectName
        }

        SubjectsAPI.update(subject.id, newSubject, session.accessToken).then(async () => {
            setEditFormShown(false);
            onUpdatedOrDeleted();
        });
    }

    const deleteSubject = () => {
        if (!confirm("Are you sure that you want to delete this subject?")) return;
        SubjectsAPI.delete(subject.id, session.accessToken).then(async () => {
            onUpdatedOrDeleted();
        })
    }

    const handleGradeCreate = grade => {
        GradesAPI.create(grade, subject.id, session.accessToken).then(async () => {
            setCreateGradeFormShown(false);
            updateGrades();
        });
    }

    return (
        <article className={styles.Subject}>
            <form className={styles.subjectHeader} onSubmit={submitEditSubjectForm}>
                <h4>{subject.name}</h4>
                <span>{grades === null ? null : <>({averageGrade(grades)})</>}</span>
                <button type="button" className={styles.headerBtn} onClick={() => setEditFormShown(!editFormShown)}>
                    <FontAwesomeIcon icon={editFormShown ? faXmark : faPenToSquare}/>
                </button>
                <button type="button" className={styles.headerBtn} onClick={() => setIsExpanded(!isExpanded)}>
                    <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown}/>
                </button>
                {
                    // If edit form is shown
                    editFormShown ? (
                        <>
                            <input className={`${formStyles.input} ${formStyles.noMargins} ${formStyles.span2}`}
                                   type="text" name="subjectname" required={true}
                                   minLength={2} maxLength={30}
                                   defaultValue={subject.name} placeholder="Subject name"/>
                            <button className={`${btnStyles.createBtn} ${formStyles.noMargins}`} type="submit">
                                <FontAwesomeIcon icon={faCheck}/>
                            </button>
                            <button className={`${btnStyles.deleteBtn} ${formStyles.noMargins}`} type="button" onClick={deleteSubject}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </>
                    ) : null
                }
            </form>
            {
                isExpanded ? (
                    grades === null ? (
                        <div>Loading...</div>
                    ) : (
                        <div className={styles.gradeGrid}>
                            {/* List grades */}
                            {
                                grades.sort((a, b) => a.description.localeCompare(b.description)).map(g => (
                                    <Grade grade={g} key={g.id} onUpdatedOrDeleted={updateGrades}/>
                                ))
                            }
                            {/* Add new grade */}
                            {
                                createGradeFormShown ? (
                                    <GradeForm onSubmit={handleGradeCreate}
                                               onCancel={() => setCreateGradeFormShown(false)}/>
                                ) : (
                                    <>
                                        <span className={styles.noGradesMsg}>
                                            {grades.length === 0 ? "No grades yet! Create a new one:" : null}
                                        </span>
                                        <button className={`${btnStyles.createBtn} ${formStyles.noMargins}`} onClick={() => setCreateGradeFormShown(true)}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    )
                ) : null
            }
        </article>
    );
}
