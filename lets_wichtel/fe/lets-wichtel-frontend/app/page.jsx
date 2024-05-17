import HomeLoggedIn from "@/components/HomeLoggedIn";
import { getSession } from "@/lib/session";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Home | Let's Wichtel",
  };
}

export default async function homePage() {
  const session = await getSession();

  return !session ? (
    <div className="flex flex-row justify-between mt-4 home:mt-16">
      <div className="w-full sm:w-3/4 home:w-1/2 pt-10">
        <h1 className="title font-black text-5xl">Let's Wichtel</h1>
        <hr className="border-2 border-secondary w-full sm:w-11/12 mt-1" />
        <p className="text font-semibold mt-6">
          Let's Wichtel ist die{" "}
          <span className="text-secondary">ultimative</span> Plattform für die
          Organisation und Durchführung von Wichtelaktionen, sei es für Freunde,
          Familie oder Kollegen.
        </p>
        <p className="text font-semibold mt-3">
          Mit einer benutzerfreundlichen Oberfläche und einer Vielzahl von
          Funktionen ist Let's Wichtel die{" "}
          <span className="text-secondary">beste Wahl</span> für all deine
          Wichtelbedürfnisse.
        </p>
        <div className="flex flex-col buttons:flex-row gap-3 mt-6">
          <Link
            href="/registrieren?redirect=/wichtel/erstellen"
            className="btn btn-primary justify-center buttons:justify-start"
          >
            Wichtel erstellen
          </Link>
          <Link
            href="/suchen"
            className="btn btn-white justify-center buttons:justify-start"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-lg mr-1.5"
            />
            <p className="mt-0.5">Wichtel suchen</p>
          </Link>
        </div>
      </div>
      <div className="w-1/2 justify-end hidden home:flex">
        <img
          src="/santa/santa-2.png"
          alt="Illustration"
          className="w-11/12 mt-6 lg:mt-0 lg:w-5/6 h-auto scale-x-[-1]"
        />
      </div>
    </div>
  ) : (
    <HomeLoggedIn />
  );
}
