"use client";

import WichtelsAPI from "@/lib/api/Wichtels";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WunschlisteForm({ session, wichtel }) {
  const [wishlist, setWishlist] = useState("");

  useEffect(() => {
    async function getWishlist() {
      let wishlist = await WichtelsAPI.getOwnWishlist(
        wichtel.id_wichtel,
        session.accessToken
      );
      if (wishlist.wishlist === null) wishlist.wishlist = "";
      setWishlist(wishlist.wishlist);
    }
    getWishlist();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let post = {
      wichtel_id: wichtel.id_wichtel,
      wunschliste: wishlist,
    };

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          await WichtelsAPI.updateWishlist(post, session.accessToken);
          resolve();
        } catch (err) {
          const responseBody = await err.response.json();
          reject(responseBody.message); // Reject with the error message
        }
      });

    // Display toast with loading message while promise is pending
    toast.promise(promise, {
      loading: "Wunschliste wird aktualisiert...",
      success: () => {
        return `Wunschliste erfolgreich aktualisiert!`;
      },
      error: (err) => {
        return `Aktualisierung fehlgeschlagen: ${err}`;
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title mb-5 text-2xl">Deine Wunschliste</h1>
      <div className="form-item mb-2">
        <textarea
          name="wunschliste"
          id="wunschliste"
          value={wishlist}
          onChange={(e) => setWishlist(e.target.value)}
          rows={6}
          className="bg-background"
        />
        <label
          className={"text font-normal " + (wishlist !== "" ? "up" : "")}
          htmlFor="wunschliste"
        >
          Wunschliste
        </label>
      </div>
      <button className={"btn w-full flex justify-center btn-primary"}>
        Aktualisieren
      </button>
    </form>
  );
}
