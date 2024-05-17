"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DesanitizeQuery } from "./HandleQueryParams";
import WichtelDetail from "./WichtelDetail";
import WichtelsAPI from "@/lib/api/Wichtels";

export default function WichtelResults() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [wichtels, setWichtels] = useState([]);

  useEffect(() => {
    if (searchParams.has("q")) {
      const desanitizedQuery = DesanitizeQuery(searchParams.get("q"));
      console.log(desanitizedQuery);
      setQuery(desanitizedQuery);

      fetchWichtels(desanitizedQuery);
    }
  }, [searchParams]);

  async function fetchWichtels(query) {
    await WichtelsAPI.findByQuery(query)
      .then((res) => {
        console.log(res);
        setWichtels(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col mt-3">
      {query === "" ? (
        <p className="text">
          Suche nach einem Wichtel, um die Ergebnisse zu sehen!
        </p>
      ) : (
        <p className="text">
          Ergebnisse für <span className="text-secondary">{query}</span>
        </p>
      )}
      {wichtels.length !== 0 && query !== "" ? (
        <div className="flex flex-row flex-wrap gap-3 mt-3">
          {wichtels.map((wichtel) => {
            // Setting started to null because it's not needed here
            wichtel.started = null;
            return <WichtelDetail key={wichtel.url} wichtel={wichtel} />;
          })}
        </div>
      ) : (
        <>
          {wichtels.length === 0 && query !== "" && (
            <p className="title text-xl mt-6">
              Es konnten keine Wichtel gefunden werden!
            </p>
          )}
        </>
      )}
    </div>
  );
}
