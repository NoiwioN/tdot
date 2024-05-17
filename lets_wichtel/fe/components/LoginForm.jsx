"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import { login } from "@/lib/session";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    global: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let errorsLocal = {
      email: "",
      password: "",
      global: "",
    };

    if (formData.email == "") {
      errorsLocal.email = "E-Mail muss ausgefüllt werden.";
    }

    if (formData.password == "") {
      errorsLocal.password = "Passwort muss ausgefüllt werden.";
    }

    setErrors(errorsLocal);

    if (formData.email == "" || formData.password == "") {
      return;
    }

    console.log(formData);
    const res = await login(formData);
    if (!res.success) {
      setErrors({ ...errors, global: res.error });
      return;
    }

    router.push("/");
  }

  return (
    <>
      {errors.global && (
        <div className="rounded-[10px] bg-error px-4 py-2 text text-sm mt-5">
          {errors.global}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={"flex flex-col gap-3 " + (errors.global ? "mt-4" : "mt-6")}
      >
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
        <div className="w-full">
          <button
            className="btn btn-primary w-full flex justify-center"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
