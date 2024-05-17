import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-backgroundDark">
      <div className="max-w-6xl container mx-auto py-10 flex flex-col lg:flex-row justify-between lg:items-center">
        <div className="w-full lg:w-1/4">
          <Link href="/">
            <img
              src="/logo-variants/logo-wide-transparent-symbol-small-text-white.png"
              alt="Let's Wichtel Logo"
              className="w-auto h-12 sm:h-16"
            />
          </Link>
        </div>
        <div className="w-full lg:w-2/4 justify-center mt-5 lg:mt-0">
          <ul className="flex flex-wrap lg:flex-nowrap text gap-x-2 -translate-x-4 lg:-translate-x-0">
            <li className="nav-link">
              <Link href="/impressum">
                <p>Impressum</p>
              </Link>
            </li>
            <li className="nav-link">
              <Link href="/datenschutz">
                <p>Datenschutz</p>
              </Link>
            </li>
            <li className="nav-link">
              <Link href="/login">
                <p>Login</p>
              </Link>
            </li>
            <li className="nav-link">
              <Link href="/registrieren">
                <p>Registrieren</p>
              </Link>
            </li>
            <li className="nav-link">
              <Link href="/kontakt">
                <p>Kontakt</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 flex mt-5 lg:mt-0 lg:justify-end">
          <div className="flex space-x-3">
            <Link href="/suchen" className="btn btn-white px-4 py-3">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-base sm:text-lg"
              />
            </Link>
            <Link href="/erstellen" className="btn btn-white px-4 py-3">
              <FontAwesomeIcon icon={faPlus} className="text-base sm:text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
