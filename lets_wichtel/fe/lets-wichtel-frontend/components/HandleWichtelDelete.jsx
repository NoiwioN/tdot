"use server";

import WichtelsAPI from "@/lib/api/Wichtels";

export default async function HandleWichtelDelete(session, wichtel) {
  const res = await WichtelsAPI.deleteWichtel(
    wichtel.id_wichtel,
    session.accessToken
  )
    .then(() => {
      return { success: true };
    })
    .catch((err) => {
      return { success: false, error: err };
    });

  return res;
}
