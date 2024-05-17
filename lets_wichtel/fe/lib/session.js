"use server";

import { cookies } from "next/headers";
import AccountsAPI from "./api/Accounts";
import { jwtDecode } from "jwt-decode";

export async function decrypt(token) {
  // Decrypt the token
  const payload = jwtDecode(token);
  const d = new Date(0);
  d.setUTCSeconds(payload.exp);
  const now = new Date();

  if (now >= d) {
    console.log("jwt expired");
    logout();
    return;
  }

  return JSON.parse(payload.sub);
}

export async function login(formData) {
  try {
    const res = await AccountsAPI.login(formData);
    const token = res.accessToken.split(" ")[1]; // Macht das Bearer Prefix weg

    // Setting the expires to 10 days
    const expires = new Date(new Date().setDate(new Date().getDate() + 10));

    cookies().set("session", token, { expires, httpOnly: true });

    return { success: true };
  } catch (e) {
    if (e.response.status === 403) {
      return { success: false, error: "Ungültige Anmeldeinformationen" };
    }
    return { success: false, error: "Ein Fehler ist aufgetreten" };
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const obj = {
    accessToken: session,
    user: await decrypt(session),
  };
  return obj;
}
