"use client";

import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import AccountForm from "./AccountForm";
import { useRouter } from "next/navigation";
import WichtelsAPI from "@/lib/api/Wichtels";
import WishlistForm from "./WishlistForm";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import HandleJoin from "./HandleJoin";
import { toast } from "sonner";

export default function JoinHandler({ url, session }) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const [wichtel, setWichtel] = useState({});
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [joined, setJoined] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    zip: "",
    city: "",
    email: "",
    password: "",
    passwordRepeat: "",
    wishlist: "",
  });

  useEffect(() => {
    async function fetchWichtel() {
      await WichtelsAPI.getWichtelByURL(url)
        .then((res) => {
          setWichtel(res);

          if (session) {
            checkJoined(res.id_wichtel);
          } else {
            setJoined(false);
          }

          if (res.needsPassword) {
            setDialogOpen(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function checkJoined(id) {
      await WichtelsAPI.getWichtelJoined(id, session.accessToken)
        .then((res) => {
          setJoined(res.joined);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchWichtel();
  }, []);

  useEffect(() => {
    if (joined) {
      router.push(`/wichtel/${wichtel.url}`);
    }
  }, [joined]);

  useEffect(() => {
    setErrorPassword("");
  }, [password]);

  async function handleSubmit() {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await HandleJoin(formData, password, wichtel);

          if (res.success) {
            resolve();
            router.push("/");
          } else {
            console.error(res.error);
            reject(res.error);
          }
        } catch (err) {
          console.error(err);
          reject("Es gab einen Fehler beim beitreten!"); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Wichtel wird beigetreten...",
      success: () => {
        return `Wichtel wurde erfolgreich beigetreten!`;
      },
      error: (err) => {
        return `Beitretung fehlgeschlagen: ${err}`;
      },
    });
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    await WichtelsAPI.validatePassword(wichtel.id_wichtel, password)
      .then((res) => {
        if (res.valid) {
          setDialogOpen(false);
          setValidPassword(true);
        } else {
          setErrorPassword("Passwort ist falsch.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function generatePage() {
    switch (page) {
      case 1:
        return (
          <PersonForm
            formData={formData}
            setFormData={setFormData}
            setPage={setPage}
          />
        );
      case 2:
        return (
          <AccountForm
            formData={formData}
            setFormData={setFormData}
            setPage={setPage}
          />
        );
      case 3:
        return (
          <WishlistForm
            formData={formData}
            setFormData={setFormData}
            setPage={setPage}
            handleSubmit={handleSubmit}
            session={session}
            maxPrice={wichtel.maxprice}
          />
        );
    }
  }

  return wichtel.started ? (
    <>
      <div>
        <button className="btn btn-white" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} className="text-lg mr-2" />
          <p className="mt-0.5">Zurück</p>
        </button>
      </div>
      <div className="flex flex-row justify-center home:justify-between">
        <h1 className="title text-4xl w-full sm:w-3/4 mx-auto home:mx-0 mt-10">
          Der Wichtel <span className="text-secondary">{wichtel.name}</span> hat
          bereits gestartet!
        </h1>
        <div className="w-1/2 justify-end hidden home:flex">
          <img
            src="/santa/santa-1.png"
            alt="Illustration"
            className="w-11/12 mt-6 lg:mt-0 lg:w-5/6 h-auto"
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="title text-xl">
              Dieser Wichtel benötigt ein Passwort
            </AlertDialogTitle>
          </AlertDialogHeader>
          <form
            onSubmit={handlePasswordSubmit}
            className="mt-4 flex flex-col gap-3"
          >
            <div className="flex flex-col relative">
              <div className="flex flex-col form-item relative">
                <input
                  className={
                    "bg-background" +
                    (errorPassword ? " border-error" : " border-text")
                  }
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className={
                    "text font-normal " + (password !== "" ? "up" : "")
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
                {errorPassword}
              </span>
            </div>
            <div className="w-full flex flex-row gap-3">
              <button
                className="btn px-3.5 flex justify-center bg-transparent border-2 border-muted text-muted hover:text-textDark hover:border-text hover:bg-text"
                type="button"
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
              </button>
              <button
                className="btn btn-primary w-full flex justify-center"
                type="submit"
              >
                Überprüfen
              </button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      {(!wichtel.needsPassword || (wichtel.needsPassword && validPassword)) && (
        <>
          <div>
            <button className="btn btn-white" onClick={() => router.back()}>
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg mr-2" />
              <p className="mt-0.5">Zurück</p>
            </button>
          </div>
          <h1 className="title text-4xl w-full sm:w-3/4 mx-auto home:mx-0 mt-10">
            Trete dem Wichtel{" "}
            <span className="text-secondary">{wichtel.name}</span> bei!
          </h1>
          <div className="flex flex-row justify-center home:justify-between">
            <div className="w-full sm:w-3/4 lg:w-2/5 mt-3">
              <div className="flex flex-col">
                <div className="flex flex-row justify-start space-x-5 items-center">
                  {!session && (
                    <>
                      <button
                        onClick={() => setPage(1)}
                        className={
                          "btn bg-transparent p-0 " +
                          (page === 1
                            ? "text-text"
                            : "text-muted hover:text-text")
                        }
                      >
                        Person
                      </button>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-base"
                      />
                      <button
                        onClick={() => setPage(2)}
                        className={
                          "btn bg-transparent p-0 " +
                          (page === 2
                            ? "text-text"
                            : "text-muted hover:text-text")
                        }
                      >
                        Account
                      </button>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-base"
                      />
                      <button
                        onClick={() => setPage(3)}
                        className={
                          "btn bg-transparent p-0 " +
                          (page === 3
                            ? "text-text"
                            : "text-muted hover:text-text")
                        }
                      >
                        Wunschliste
                      </button>
                    </>
                  )}
                </div>
                {!session ? (
                  generatePage()
                ) : (
                  <WishlistForm
                    formData={formData}
                    setFormData={setFormData}
                    setPage={setPage}
                    handleSubmit={handleSubmit}
                    session={session}
                    maxPrice={wichtel.maxprice}
                  />
                )}
              </div>
            </div>
            <div className="w-1/2 justify-end hidden home:flex">
              <img
                src="/santa/santa-3.png"
                alt="Illustration"
                className="w-11/12 mt-6 lg:mt-0 lg:w-5/6 h-auto"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
