import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function AccountForm({ formData, setFormData, setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsLocal = {
      email: "",
      password: "",
      passwordRepeat: "",
    };

    if (formData.email === "") {
      errorsLocal.email = "E-Mail muss ausgefüllt werden.";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errorsLocal.email = "Bitte gib eine gültige E-Mail Adresse ein.";
    }
    if (formData.password === "") {
      errorsLocal.password = "Passwort muss ausgefüllt werden.";
    }
    if (formData.password.length < 8) {
      errorsLocal.password = "Passwort muss mindestens 8 Zeichen lang sein.";
    }
    if (formData.passwordRepeat === "") {
      errorsLocal.passwordRepeat =
        "Passwort wiederholen muss ausgefüllt werden.";
    }
    if (formData.password !== formData.passwordRepeat) {
      errorsLocal.passwordRepeat = "Passwörter stimmen nicht überein.";
    }

    setErrors(errorsLocal);

    if (
      errorsLocal.email ||
      errorsLocal.password ||
      errorsLocal.passwordRepeat
    ) {
      return;
    }

    setPage(3);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col form-item">
            <input
              className={
                "bg-background" +
                (errors.email ? " border-error" : " border-text")
              }
              type="email"
              autoComplete="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label
              className={
                "text font-normal " + (formData.email != "" ? "up" : "")
              }
              htmlFor="email"
            >
              E-Mail
            </label>
          </div>
          <span className="mt-1 ms-0.5 text-sm text text-error">
            {errors.email}
          </span>
        </div>
      </div>
      <div className="flex flex-col relative">
        <div className="flex flex-col form-item relative">
          <input
            className={
              "bg-background" +
              (errors.password ? " border-error" : " border-text")
            }
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <label
            className={
              "text font-normal " + (formData.password !== "" ? "up" : "")
            }
            htmlFor="password"
          >
            Passwort
          </label>
          <FontAwesomeIcon
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <span className="mt-1 ms-0.5 text-sm text text-error">
          {errors.password}
        </span>
      </div>
      <div className="flex flex-col relative">
        <div className="flex flex-col form-item relative">
          <input
            className={
              "bg-background" +
              (errors.passwordRepeat ? " border-error" : " border-text")
            }
            type={showPasswordRepeat ? "text" : "password"}
            name="passwordRepeat"
            autoComplete="new-password"
            id="passwordRepeat"
            value={formData.passwordRepeat}
            onChange={handleInputChange}
          />
          <label
            className={
              "text font-normal " + (formData.passwordRepeat !== "" ? "up" : "")
            }
            htmlFor="passwordRepeat"
          >
            Passwort wiederholen
          </label>
          <FontAwesomeIcon
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
            icon={showPasswordRepeat ? faEyeSlash : faEye}
            onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
          />
        </div>
        <span className="mt-1 ms-0.5 text-sm text text-error">
          {errors.passwordRepeat}
        </span>
      </div>
      <div className="w-full flex flex-row gap-3">
        <button
          className="btn px-3.5 flex justify-center bg-transparent border-2 border-muted text-muted hover:text-textDark hover:border-text hover:bg-text"
          type="button"
          onClick={() => setPage(1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
        </button>
        <button
          className="btn btn-primary w-full flex justify-center"
          type="submit"
        >
          Weiter
        </button>
      </div>
    </form>
  );
}
