import { useState } from "react";

export default function PersonForm({ formData, setFormData, setPage }) {
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    address: "",
    zip: "",
    city: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsLocal = {
      firstname: "",
      lastname: "",
      address: "",
      zip: "",
      city: "",
    };

    if (formData.firstname === "") {
      errorsLocal.firstname = "Vorname muss ausgefüllt werden.";
    }
    if (formData.lastname === "") {
      errorsLocal.lastname = "Nachname muss ausgefüllt werden.";
    }
    if (formData.address === "") {
      errorsLocal.address = "Adresse muss ausgefüllt werden.";
    }
    if (formData.zip === "") {
      errorsLocal.zip = "PLZ muss ausgefüllt werden.";
    }
    if (formData.zip > 99999 || formData.zip < 1000) {
      errorsLocal.zip = "PLZ muss zwischen 1000 und 99999 liegen.";
    }
    if (formData.city === "") {
      errorsLocal.city = "Stadt muss ausgefüllt werden.";
    }

    setErrors(errorsLocal);

    if (
      errorsLocal.firstname ||
      errorsLocal.lastname ||
      errorsLocal.address ||
      errorsLocal.zip ||
      errorsLocal.city
    ) {
      return;
    }
    setPage(2);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col form-item">
            <input
              className={
                "bg-background" +
                (errors.firstname ? " border-error" : " border-text")
              }
              type="text"
              autoComplete="given-name"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <label
              className={
                "text font-normal " + (formData.firstname != "" ? "up" : "")
              }
              htmlFor="firstname"
            >
              Vorname
            </label>
          </div>
          <span className="mt-1 ms-0.5 text-sm text text-error">
            {errors.firstname}
          </span>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col form-item">
            <input
              className={
                "bg-background" +
                (errors.lastname ? " border-error" : " border-text")
              }
              type="text"
              autoComplete="family-name"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            <label
              className={
                "text font-normal " + (formData.lastname != "" ? "up" : "")
              }
              htmlFor="lastname"
            >
              Nachname
            </label>
          </div>
          <span className="mt-1 ms-0.5 text-sm text text-error">
            {errors.lastname}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col form-item">
          <input
            className={
              "bg-background" +
              (errors.address ? " border-error" : " border-text")
            }
            type="text"
            autoComplete="street-address"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label
            className={
              "text font-normal " + (formData.address != "" ? "up" : "")
            }
            htmlFor="address"
          >
            Adresse
          </label>
        </div>
        <span className="mt-1 ms-0.5 text-sm text text-error">
          {errors.address}
        </span>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col form-item">
            <input
              className={
                "bg-background" +
                (errors.zip ? " border-error" : " border-text")
              }
              type="number"
              autoComplete="postal-code"
              name="zip"
              id="zip"
              value={formData.zip}
              onChange={handleInputChange}
            />
            <label
              className={"text font-normal " + (formData.zip != "" ? "up" : "")}
              htmlFor="zip"
            >
              PLZ
            </label>
          </div>
          <span className="mt-1 ms-0.5 text-sm text text-error">
            {errors.zip}
          </span>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col form-item">
            <input
              className={
                "bg-background" +
                (errors.city ? " border-error" : " border-text")
              }
              type="text"
              autoComplete="address-level2"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <label
              className={
                "text font-normal " + (formData.city != "" ? "up" : "")
              }
              htmlFor="city"
            >
              Stadt
            </label>
          </div>
          <span className="mt-1 ms-0.5 text-sm text text-error">
            {errors.city}
          </span>
        </div>
      </div>
      <div className="w-full">
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
