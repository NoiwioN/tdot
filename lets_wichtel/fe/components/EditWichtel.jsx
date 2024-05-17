"use client";

import { toast } from "sonner";
import HandleWichtelDelete from "./HandleWichtelDelete";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function EditWichtel({ session, wichtel }) {
  const router = useRouter();

  async function handleClick() {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const res = await HandleWichtelDelete(session, wichtel);
          if (res.success) {
            resolve();
            router.push("/");
          } else {
            console.error(res.error);
            reject(res.error);
          }
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Wichtel wird gelöscht...",
      success: () => {
        return `Wichtel wurde erfolgreich gelöscht!`;
      },
      error: (err) => {
        return `Löschung fehlgeschlagen: ${err}`;
      },
    });
  }

  return (
    <div className="flex flex-wrap flex-row mt-2.5 gap-2">
      <button className={"btn btn-primary"} onClick={handleClick}>
        Wichtel löschen
      </button>
      <Link
        href={`/wichtel/${wichtel.url}/bearbeiten`}
        className="btn btn-white px-4 text-sm"
      >
        <FontAwesomeIcon icon={faPen} />
      </Link>
    </div>
  );
}
