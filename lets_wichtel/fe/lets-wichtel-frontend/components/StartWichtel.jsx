"use client";

import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CheckStart from "./CheckStart";
import { toast } from "sonner";
import WichtelsAPI from "@/lib/api/Wichtels";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function StartWichtel({ wichtel, session }) {
  const router = useRouter();

  const [blockouts, setBlockouts] = useState([
    { account_id: undefined, blocked_account_id: undefined },
  ]);

  useEffect(() => {
    console.log(blockouts);
  }, [blockouts]);

  function handleChange(index, fieldName, value) {
    const updatedBlockouts = [...blockouts];
    updatedBlockouts[index][fieldName] = parseInt(value);
    setBlockouts(updatedBlockouts);
  }

  async function handleSubmit() {
    // Swap the array to have both directions
    const swappedArray = blockouts.map((obj) => {
      return {
        account_id: obj.blocked_account_id,
        blocked_account_id: obj.account_id,
      };
    });

    // Combine both arrays
    const combinedArray = blockouts.concat(swappedArray);

    // Remove duplicates
    const uniqueArray = combinedArray.filter(
      (v, i, a) =>
        a.findIndex(
          (t) =>
            t.account_id === v.account_id &&
            t.blocked_account_id === v.blocked_account_id
        ) === i
    );

    const postObj = {
      wichtel_id: wichtel.id_wichtel,
      blockouts: uniqueArray,
    };

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const newBlockouts = [...postObj.blockouts];
          // Throw error if any field is empty but if both are empty splice it out
          for (let i = 0; i < postObj.blockouts.length; i++) {
            let inValid = true;
            let both = false;
            if (
              postObj.blockouts[i].account_id == undefined ||
              postObj.blockouts[i].blocked_account_id == undefined
            ) {
              if (
                postObj.blockouts[i].account_id == undefined &&
                postObj.blockouts[i].blocked_account_id == undefined
              ) {
                both = true;
              }
            } else {
              inValid = false;
            }

            if (inValid && both) {
              newBlockouts.splice(i, 1);
            } else if (inValid) {
              reject("Bitte fülle alle Felder aus.");
            }
          }

          postObj.blockouts = newBlockouts;

          const res = await CheckStart(postObj, wichtel.accounts);
          if (res.success) {
            await WichtelsAPI.startWichtel(postObj, session.accessToken).then(
              () => {
                resolve();
                router.refresh();
              }
            );
          } else {
            reject("Die Zuteilung mit diesen Blockierungen ist nicht möglich.");
          }
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message);
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Zuteilung wird verarbeitet...",
      success: () => {
        return `Zuteilung erfolgreich! Wichtel wurde gestartet.`;
      },
      error: (err) => {
        return `Zuteilung fehlgeschlagen: ${err}`;
      },
    });
  }

  return (
    <div className="border-2 border-backgroundLight rounded-xl shadow-custom bg-background p-2.5 mt-2">
      <div className="flex flex-col w-full gap-3">
        {blockouts.map((blockout, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-2"
          >
            <div className="flex flex-row justify-between items-center gap-2 w-full">
              <Select
                value={blockout.account_id ? blockout.account_id : ""}
                onValueChange={(value) => {
                  console.log(value);

                  handleChange(index, "account_id", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wichtel.accounts.map((account) => {
                      if (account.id_account != blockout.blocked_account_id) {
                        return (
                          <SelectItem
                            value={account.id_account}
                            key={account.id_account}
                          >
                            {account.firstname} {account.lastname}
                          </SelectItem>
                        );
                      }
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FontAwesomeIcon icon={faBan} className="text-error" />
              <Select
                value={
                  blockout.blocked_account_id ? blockout.blocked_account_id : ""
                }
                onValueChange={(value) => {
                  console.log(value);
                  handleChange(index, "blocked_account_id", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wichtel.accounts.map((account) => {
                      if (account.id_account != blockout.account_id) {
                        return (
                          <SelectItem
                            value={account.id_account}
                            key={account.id_account}
                          >
                            {account.firstname} {account.lastname}
                          </SelectItem>
                        );
                      }
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {index !== 0 && (
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-error cursor-pointer"
                onClick={() => {
                  const updatedBlockouts = [...blockouts];
                  updatedBlockouts.splice(index, 1);
                  setBlockouts(updatedBlockouts);
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between mt-3 gap-2.5">
        <button
          onClick={() =>
            setBlockouts([
              ...blockouts,
              { account_id: undefined, blocked_account_id: undefined },
            ])
          }
          className="btn btn-white px-3.5 flex justify-center rounded-xl text-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-primary w-full flex justify-center rounded-xl text-sm"
        >
          Starten
        </button>
      </div>
    </div>
  );
}
