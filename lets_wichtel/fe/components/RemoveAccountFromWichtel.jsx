"use client";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import WichtelsAPI from "@/lib/api/Wichtels";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RemoveAccountFromWichtel({
  account,
  session,
  wichtel,
}) {
  const router = useRouter();

  async function handleAccountDelete() {
    try {
      await WichtelsAPI.removeAccountFromWichtel(
        account.id_account,
        wichtel.id_wichtel,
        session.accessToken
      );
      router.refresh();
    } catch (err) {
      toast.error(
        `${account.firstname} ${account.lastname} konnte nicht entfernt werden!`
      );
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute right-4 top-[9px]">
        <FontAwesomeIcon icon={faTrashCan} className="text-error" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bist du sicher, dass du{" "}
            <span className="text-secondary ">
              {account.firstname} {account.lastname}
            </span>{" "}
            vom Wichtel entfernen möchtest?
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
  );
}
