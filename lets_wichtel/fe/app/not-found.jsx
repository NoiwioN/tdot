"use client";

import { faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function notFoundPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "404 - Seite wurde nicht gefunden | Let's Wichtel";
  }, []);

  return (
    <div className="mx-auto flex flex-col justify-center text-center items-center mt-8">
      <img
        src="/santa/santa-1.png"
        alt="Santa in chimney"
        className="w-9/12 md:w-5/12 h-auto mx-auto"
      />
      <p className="text text-error my-4 mt-6">Error 404</p>
      <h1 className="title text-2xl px-0 sm:px-16 lg:px-52 ">
        Der Weihnachtsmann hat überall nach dieser Seite gesucht, konnte sie
        aber leider nicht finden...
      </h1>
      <div className="flex flex-row gap-3 mt-4">
        <button className="btn btn-primary" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Zurück
        </button>
        <button className="btn btn-white" onClick={() => router.refresh()}>
          <FontAwesomeIcon icon={faRefresh} className="mr-2" /> Neu laden
        </button>
      </div>
    </div>
  );
}
