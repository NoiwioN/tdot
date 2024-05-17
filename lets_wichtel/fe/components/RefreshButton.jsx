"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  return (
    <button
      className={"btn btn-white px-3.5 py-3"}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 750);
        router.refresh();
      }}
    >
      <FontAwesomeIcon
        icon={faRefresh}
        className={
          "text-base sm:text-lg " +
          (clicked ? "animate-[spin_0.7s_linear]" : "")
        }
      />
    </button>
  );
}
