"use server";

import WichtelsAPI from "@/lib/api/Wichtels";
import { getSession } from "@/lib/session";

export default async function InsertWichtel(wichtel) {
  const session = await getSession();

  const res = await WichtelsAPI.createWichtel(wichtel, session.accessToken)
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { success: false, error: err };
    });

  return res;
}
