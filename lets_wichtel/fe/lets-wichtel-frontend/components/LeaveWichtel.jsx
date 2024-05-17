"use client";

import WichtelsAPI from "@/lib/api/Wichtels";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LeaveWichtel({ session, wichtel }) {
  const router = useRouter();

  async function handleLeave() {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        if (wichtel.started === true)
          reject(
            "Der Wichtel wurde bereits gestartet und kann nicht mehr verlassen werden."
          );

        try {
          await WichtelsAPI.removeAccountFromWichtel(
            session.user.accountId,
            wichtel.id_wichtel,
            session.accessToken
          ).then(() => {
            resolve();
            router.push("/");
          });
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Wichtel wird verlassen...",
      success: () => {
        return `Wichtel wurde erfolgreich verlassen.`;
      },
      error: (err) => {
        return `Verlassung fehlgeschlagen: ${err}`;
      },
    });
  }

  return (
    <button
      className={
        "btn mt-2.5 " +
        (wichtel.started === false ? "btn-primary" : "btn-muted")
      }
      disabled={wichtel.started === true}
      onClick={handleLeave}
    >
      Wichtel verlassen
    </button>
  );
}
