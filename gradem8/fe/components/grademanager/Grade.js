import React, {useState} from 'react';
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GradesAPI from "/lib/api/Grades";
import {useGlobalContext} from "/store";
import GradeForm from "./GradeForm";
import btnStyles from "../../styles/buttons.module.css";
import formStyles from "../../styles/forms.module.css";

/**
 * Component representing a grade row in a subject block
 * @param grade
 * @param onUpdatedOrDeleted
 * @returns {JSX.Element}
 * @constructor
 */
export default function Grade({grade, onUpdatedOrDeleted}) {
    const {session} = useGlobalContext();

    const [editMode, setEditMode] = useState(false);

    const handleSubmit = newGrade => {
        GradesAPI.update(grade.id, newGrade, session.accessToken).then(async () => {
            setEditMode(false);
            onUpdatedOrDeleted();
        })
    }

    const handleDeleteButtonClick = () => {
        if (!confirm("Are you sure that you want to delete this grade?")) return;
        GradesAPI.delete(grade.id, session.accessToken).then(async () => {
            onUpdatedOrDeleted();
        })
    }

    return editMode ? (
        <GradeForm prefilledData={grade} onSubmit={handleSubmit} onCancel={() => setEditMode(false)}/>
    ) : (
        <>
            <p>{grade.value === null ? null : grade.value.toFixed(2)}&nbsp;</p>
            <p>{grade.weight === null ? null : grade.weight.toFixed(2)}&nbsp;</p>
            <p>{grade.description}</p>
            <p>{grade.date} &nbsp;</p>
            <button className={`${btnStyles.editBtn} ${formStyles.noMargins}`} type="button"
                    onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            <button className={`${btnStyles.deleteBtn} ${formStyles.noMargins}`} type="button"
                    onClick={handleDeleteButtonClick}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </>
    );
}
