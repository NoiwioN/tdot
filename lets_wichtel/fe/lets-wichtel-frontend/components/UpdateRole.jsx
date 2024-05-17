"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import WichtelsAPI from "@/lib/api/Wichtels";
import { toast } from "sonner";

export default function UpdateRole({ account, wichtel, session }) {
  const [selectedRole, setSelectedRole] = useState();

  const roles = [
    { id_role: 1, name: "User" },
    { id_role: 3, name: "Moderator" },
  ];

  useEffect(() => {
    console.log(selectedRole);
  }, [selectedRole]);

  async function handleRoleUpdate() {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          await WichtelsAPI.updateRoleOfAccountInWichtel(
            selectedRole,
            account.id_account,
            wichtel.id_wichtel,
            session.accessToken
          )
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Rolle wird aktualisiert...",
      success: () => {
        return `Rolle erfolgreich aktualisiert!`;
      },
      error: (err) => {
        return `Aktualisierung fehlgeschlagen: ${err}`;
      },
    });
  }

  console.log(account);

  return (
    <div className="ml-2">
      <AlertDialog>
        <AlertDialogTrigger className="btn btn-primary text-xs rounded-md py-1.5 pt-[8px] px-4">
          <p>Rolle ändern</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="title text-lg">
              Rolle von{" "}
              <span className="text-secondary">
                {account.firstname} {account.lastname}
              </span>{" "}
              ändern
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Select
            defaultValue={account.role.id_role}
            value={roles.id_role}
            onValueChange={(value) => setSelectedRole(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Rolle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {roles.map((role) => {
                  return (
                    <SelectItem value={role.id_role} key={role.id_role}>
                      {role.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleRoleUpdate}>
              Ändern
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
