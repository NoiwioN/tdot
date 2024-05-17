import React, {useState} from 'react';
import LabelledValidatedInput from "/components/LabelledValidatedInput";
import headerStyles from "/styles/forms.module.css";


/**
 * Profile form (Create or edit user)
 *
 * Does not submit anything to the API!
 * @param onSubmit function called on submit of the form with the new user object
 * @param isEditing if there is already a user that is being edited ("sign up" mode if false)
 * @param oldUser the old user object (optional)
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProfileForm({onSubmit, isEditing, oldUser = {}}) {
    const [passwordRepeatValidationErrorMessage, setPasswordRepeatValidationErrorMessage] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePW = (formElem) => {
        const formData = new FormData(formElem);
        const password = formData.get("password");
        const password2 = formData.get("password2");

        if (password !== password2) {
            setPasswordRepeatValidationErrorMessage("Passwords do not match!");
            return false;
        } else {
            setPasswordRepeatValidationErrorMessage("");
            return true;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        setIsSubmitting(true);

        if (!validatePW(e.target)) return;

        const formData = new FormData(e.target);
        const newUserData = {
            username: formData.get("username"),
            firstName: formData.get("firstname"),
            lastName: formData.get("lastname"),
            password: formData.get("password"),
        }

        onSubmit(newUserData).catch(err => {
            setIsSubmitting(false);
            console.warn("Error caught: ", err);
        });
    }

    return (<form className={headerStyles.form} onSubmit={handleSubmit}>
        <LabelledValidatedInput name="username"
                                label="Username:"
                                required={true}
                                defaultValue={oldUser.username}/>
        <LabelledValidatedInput name="firstname"
                                label="First name:"
                                required={false}
                                defaultValue={oldUser.firstName}/>
        <LabelledValidatedInput name="lastname"
                                label="Last name:"
                                required={false}
                                defaultValue={oldUser.lastName}/>
        <LabelledValidatedInput type="password"
                                name="password"
                                label={isEditing ? "New password:" : "Password:"}
                                required={true}
                                onInput={e => validatePW(e.target.form)}/>
        <LabelledValidatedInput type="password" name="password2"
                                label={isEditing ? "Repeat new password:" : "Repeat password:"}
                                required={true} onInput={e => validatePW(e.target.form)}/>

        {passwordRepeatValidationErrorMessage &&
            <p className={headerStyles.globalError}>{passwordRepeatValidationErrorMessage}</p>}

        <button className={headerStyles.updateBtn} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isEditing ? "Update" : "Register"}
        </button>
    </form>);
}
