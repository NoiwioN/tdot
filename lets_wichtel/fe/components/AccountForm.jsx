"use client";

import { useEffect, useState } from "react";
import AccountsAPI from "@/lib/api/Accounts";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { logout } from "@/lib/session";
import { useRouter } from "next/navigation";

export default function AccountForm({ session }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    zip: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    zip: "",
    city: "",
  });

  async function handleAccountDelete() {
    let tempToken = session.accessToken;
    await logout();
    AccountsAPI.deleteAccount(tempToken);
    router.push("/");
  }

  async function getAccount() {
    if (session) {
      await AccountsAPI.getAccount(session.accessToken)
        .then((res) => {
          console.log(res);
          setFormData({
            firstname: res.firstname,
            lastname: res.lastname,
            email: res.email,
            address: res.address,
            zip: res.ort.plz,
            city: res.ort.ort,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let errorsLocal = {
      firstname: "",
      lastname: "",
      email: "",
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
    if (formData.email === "") {
      errorsLocal.email = "E-Mail muss ausgefüllt werden.";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errorsLocal.email = "Bitte gib eine gültige E-Mail Adresse ein.";
    }
    if (formData.address === "") {
      errorsLocal.address = "Adresse muss ausgefüllt werden.";
    }
    if (formData.zip === "") {
      errorsLocal.zip = "PLZ muss ausgefüllt werden.";
    }
    if (formData.city === "") {
      errorsLocal.city = "Ort muss ausgefüllt werden.";
    }

    setErrors(errorsLocal);

    if (
      errorsLocal.firstname ||
      errorsLocal.lastname ||
      errorsLocal.email ||
      errorsLocal.address ||
      errorsLocal.zip ||
      errorsLocal.city
    ) {
      return;
    }

    const account = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      address: formData.address,
      plz: parseInt(formData.zip, 10),
      ort: formData.city,
    };

    await AccountsAPI.updateAccount(account, session.accessToken)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
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
                (errors.email ? " border-error" : " border-text")
              }
              type="text"
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
                className={
                  "text font-normal " + (formData.zip != "" ? "up" : "")
                }
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
            Aktualisieren
          </button>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className="border-solid border-2 rounded-lg border-red-500 w-20">
            <FontAwesomeIcon icon={faTrashCan} className="text-error" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Bist du sicher, dass du deinen Account löschen möchtest
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className={
                  "btn btn-white bg-background border-text text-text hover:bg-text hover:text-textDark duration-300"
                }
              >
                Abbrechen
              </AlertDialogCancel>
              <AlertDialogAction
                className={"btn btn-primary bg-error"}
                onClick={handleAccountDelete}
              >
                Entfernen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
}
