"use server";

import AccountsAPI from "@/lib/api/Accounts";
import WichtelsAPI from "@/lib/api/Wichtels";
import { getSession, login } from "@/lib/session";

export default async function HandleJoin(formData, password, wichtel) {
  const session = await getSession();

  if (session == null) {
    if (
      formData.firstname == "" ||
      formData.lastname == "" ||
      formData.address == "" ||
      formData.zip == "" ||
      formData.city == "" ||
      formData.email == "" ||
      formData.password == "" ||
      formData.passwordRepeat == "" ||
      formData.password != formData.passwordRepeat
    ) {
      return;
    }

    const joinData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      plz: parseInt(formData.zip, 10),
      ort: formData.city,
    };

    await AccountsAPI.register(joinData).then(async (res) => {
      await login({ email: formData.email, password: formData.password }).then(
        async () => {
          const res = await joinWichtel(wichtel, password, formData);
          return res;
        }
      );
    });
  }

  const res = await joinWichtel(wichtel, password, formData);
  return res;
}

async function joinWichtel(wichtel, password, formData) {
  const session = await getSession();
  const token = session.accessToken;

  const res = await WichtelsAPI.joinWichtel(wichtel.id_wichtel, password, token)
    .then(async () => {
      const res = await WichtelsAPI.updateWishlist(
        { wichtel_id: wichtel.id_wichtel, wunschliste: formData.wishlist },
        token
      )
        .then(() => {
          return { success: true };
        })
        .catch(async (err) => {
          const responseBody = await err.response.json();
          return { success: false, error: responseBody };
        });
      return res;
    })
    .catch(async (err) => {
      const responseBody = await err.response.json();
      return { success: false, error: responseBody };
    });

  return res;
}
