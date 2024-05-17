import React, {useId, useState} from 'react';
import styles from "/styles/forms.module.css";
import {useTranslation} from "react-i18next";

export default function LabelledValidatedInput({
                                                   name,
                                                   label,
                                                   type = "text",
                                                   required = false,
                                                   validationFunc,
                                                   onInput,
                                                   children,
                                                   ...opts
                                               }) {
    const elemId = useId();

    const [errorMessage, setErrorMessage] = useState("");
    const {t} = useTranslation()

    const handleInput = e => {
        let valid = true, msg = "";
        if (validationFunc) {
            [valid, msg] = validationFunc(e.target.value, e.target.form);
        } else if (required) {
            [valid, msg] = [e.target.value !== "",t("profileForm:empty")];
        }

        if (valid) {
            setErrorMessage("");
            e.target.setCustomValidity("");
        } else {
            setErrorMessage(msg);
            e.target.setCustomValidity(msg);
        }

        if (onInput) {
            onInput(e);
        }
    }

    return (
        <>
            <label htmlFor={elemId}>{label}</label>
            <div>
                {
                    type === "textarea" ?
                        <textarea id={elemId} name={name} required={required}
                                  onInput={handleInput} {...opts} />
                        : type === "select" ?
                            <select id={elemId} name={name} required={required}
                                    onChange={handleInput} {...opts} >{children}</select>
                            :
                            <input id={elemId} type={type} name={name} required={required}
                                   onInput={handleInput} {...opts} />
                }
                {
                    !(errorMessage) ||
                    <p className={styles.error}>{errorMessage}</p>
                }
            </div>
        </>
    );
}
