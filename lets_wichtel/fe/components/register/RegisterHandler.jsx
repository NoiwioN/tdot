"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PersonForm from "./PersonForm";
import AccountForm from "./AccountForm";
import AccountsAPI from "@/lib/api/Accounts";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/lib/session";

export default function RegisterHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    zip: "",
    city: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  async function registerAccount() {
    if (
      formData.firstname == "" ||
      formData.lastname == "" ||
      formData.address == "" ||
      formData.zip == "" ||
      formData.city == "" ||
      formData.email == "" ||
      formData.password == "" ||
      formData.passwordRepeat == "" ||
      formData.password != formData.passwordRepeat
    ) {
      return;
    }

    const postData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      plz: parseInt(formData.zip, 10),
      ort: formData.city,
    };

    console.log(postData);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          await AccountsAPI.register(postData);
          const loginRes = await login({
            email: postData.email,
            password: postData.password,
          });
          if (loginRes.success) {
            resolve(); // Resolve response
            if (searchParams.has("redirect")) {
              console.log(searchParams.get("redirect"));
              router.push(searchParams.get("redirect"));
            } else {
              router.push("/");
            }
          } else {
            reject(new Error("Login war nicht erfolgreich."));
          }
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Registrierung wird verarbeitet...",
      success: () => {
        return `Registrierung erfolgreich! Willkommen, ${postData.firstname}!`;
      },
      error: (err) => {
        return `Registrierung fehlgeschlagen: ${err}`;
      },
    });
  }

  return (
    <div className="flex flex-col mt-3">
      <div className="flex flex-row justify-start space-x-5 items-center">
        <button
          onClick={() => setPage(1)}
          className={
            "btn bg-transparent p-0 " +
            (page === 1 ? "text-text" : "text-muted hover:text-text")
          }
        >
          Person
        </button>
        <FontAwesomeIcon icon={faChevronRight} className="text-base" />
        <button
          onClick={() => setPage(2)}
          className={
            "btn bg-transparent p-0 " +
            (page === 2 ? "text-text" : "text-muted hover:text-text")
          }
        >
          Account
        </button>
      </div>
      {page === 1 ? (
        <PersonForm
          formData={formData}
          setFormData={setFormData}
          setPage={setPage}
        />
      ) : (
        <AccountForm
          formData={formData}
          setFormData={setFormData}
          setPage={setPage}
          registerAccount={registerAccount}
        />
      )}
    </div>
  );
}
