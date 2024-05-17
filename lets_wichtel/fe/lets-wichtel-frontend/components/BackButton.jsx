"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="btn btn-white" onClick={() => router.back()}>
      <FontAwesomeIcon icon={faArrowLeft} className="text-lg mr-2" />
      <p className="mt-0.5">Zurück</p>
    </button>
  );
}
