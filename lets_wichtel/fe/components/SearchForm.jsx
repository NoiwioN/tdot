"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DesanitizeQuery, SanitizeQuery } from "./HandleQueryParams";

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const sanitizedQuery = SanitizeQuery(query);

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", sanitizedQuery);

    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (searchParams.has("q")) {
      const desanitizedQuery = DesanitizeQuery(searchParams.get("q"));

      setQuery(desanitizedQuery);

      document.title = `Ergebnisse für: ${desanitizedQuery} | Let's Wichtel`;
    }
  }, [searchParams]);

  return (
    <form
      className="flex flex-row gap-3 w-[600px] mt-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col form-item w-[400px]">
        <input
          className="bg-background border-backgroundLight shadow-custom"
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label
          className={"text font-normal " + (query != "" ? "up" : "")}
          htmlFor="query"
        >
          Suchen
        </label>
      </div>
      <button type="submit" className="btn bg-primary">
        Suchen
      </button>
    </form>
  );
}
