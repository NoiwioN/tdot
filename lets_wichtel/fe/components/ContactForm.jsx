"use client";

import React from "react";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const name = e.target.name;
    const text = e.target.value;
    console.log(text);
    setFormData({
      [name]: text,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let errorsLocal = {
      email: "",
      message: "",
    };

    if (formData.email === "") {
      errorsLocal.email = "E-Mail darf nicht leer sein";
    }

    if (formData.message === "") {
      errorsLocal.message = "Nachricht darf nicht leer sein";
    }

    setErrors(errorsLocal);

    if (errorsLocal.email || errorsLocal.message) {
      return;
    }

    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
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
      <div className="flex flex-col">
        <div className="flex flex-col form-item">
          <textarea
            className={
              "bg-background" +
              (errors.message ? " border-error" : " border-text")
            }
            type="text"
            name="message"
            autoComplete="off"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
          />
          <label
            className={
              "text font-normal " + (formData.message !== "" ? "up" : "")
            }
            htmlFor="message"
          >
            Nachricht
          </label>
        </div>
        <span className="mt-1 ms-0.5 text-sm text text-error">
          {errors.message}
        </span>
      </div>
      <div className="w-full">
        <button
          className="btn btn-primary w-full flex justify-center"
          type="submit"
        >
          Absenden
        </button>
      </div>
    </form>
  );
}
