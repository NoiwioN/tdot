import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "@mdi/react";
import {
  mdiAccountGroupOutline,
  mdiLockOpenVariantOutline,
  mdiLockOutline,
} from "@mdi/js";
import WichtelsAPI from "@/lib/api/Wichtels";
import Link from "next/link";
import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import CalculateDate from "@/components/CalculateDate";
import { getSession } from "@/lib/session";
import BackButton from "@/components/BackButton";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default async function defaultPage({ params }) {
  let wichtel = null;
  let notFound = false;
  try {
    wichtel = await WichtelsAPI.getWichtelByURL(params.url);
  } catch (err) {
    const responseBody = await err.response.json();
    console.error(responseBody);

    if (responseBody.status === 404) {
      notFound = true;
    }
  }

  return wichtel ? (
    <div className="flex flex-row justify-center home:justify-between mt-6">
      <div className="w-full sm:w-3/4 lg:w-2/5">
        <div>
          <BackButton />
        </div>
        <div className="mx-auto md:mx-0 mt-8">
          <div className="flex mb-2">
            <h1 className="title">{wichtel.name}</h1>
          </div>
          <div className="flex">
            <FontAwesomeIcon icon={faUser} className="mt-1 mr-1.5 ms-0.5" />
            <p className="text">
              Organisator:{" "}
              {`${wichtel.administrator.firstname} ${wichtel.administrator.lastname}`}
            </p>
          </div>
          <div className="flex">
            <Icon
              path={mdiAccountGroupOutline}
              size={0.8}
              className="mt-1 mr-1"
            />
            <p className="text mt-0.5">{wichtel.accountCount} Teilnehmer</p>
          </div>
          <div className="flex">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="mt-1 mr-2 ms-0.5"
            />
            <p className="text mt-0.5">
              Erstellt am {CalculateDate(wichtel.createdat)}
            </p>
          </div>
          <div className="flex">
            <Icon
              path={
                wichtel.is_private == true
                  ? mdiLockOutline
                  : mdiLockOpenVariantOutline
              }
              size={0.8}
              className="mt-1 mr-1"
            />
            <p className="text mt-[3px]">
              {wichtel.is_private == true ? "Privat" : "Öffentlich"}
            </p>
          </div>
          <div className="w-full sm:w-2/3 mt-5">
            <Link href={`/wichtel/${params.url}/beitreten/`}>
              <button
                className="btn btn-primary w-full flex justify-center"
                type="submit"
              >
                Beitreten
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 justify-end hidden home:flex">
        <img
          src="/santa/santa-4.png"
          alt="Illustration"
          className="w-11/12 mt-6 lg:mt-0 lg:w-2/3 h-auto scale-x-[-1]"
        />
      </div>
    </div>
  ) : (
    <>
      {notFound ? (
        <div className="flex flex-col mt-6">
          <div>
            <BackButton />
          </div>
          <div className="flex flex-row justify-between mt-8">
            <div className="w-full sm:w-3/4 lg:w-2/5">
              <div>
                <h1 className="title">Wichtel nicht gefunden</h1>
                <p className="text mt-2">
                  Der Wichtel mit der URL{" "}
                  <span className="text-secondary">{params.url}</span> konnte
                  nicht gefunden werden.
                </p>
              </div>
            </div>
            <div className="w-1/2 justify-end hidden home:flex">
              <img
                src="/santa/santa-1.png"
                alt="Illustration"
                className="w-11/12 lg:w-2/3 h-auto scale-x-[-1]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 w-full flex justify-center">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )}
    </>
  );
}
