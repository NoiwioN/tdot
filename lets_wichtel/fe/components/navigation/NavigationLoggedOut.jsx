"use client";

import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLoggedOut() {
  const pathname = usePathname();

  const handleMenu = () => {
    const menu = document.querySelector(".nav-menu");
    menu.classList.toggle("hidden");
  };

  return (
    <>
      <nav className="w-full flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center max-w-6xl container my-4">
        <div className="lg:w-1/4">
          <Link href="/">
            <img
              src="/logo-variants/logo-wide-transparent-symbol-small-text-white.png"
              alt="Let's Wichtel Logo"
              className="w-auto h-12 sm:h-16"
            />
          </Link>
        </div>
        <div className="hidden lg:w-2/4 lg:flex justify-center">
          <ul className="flex text space-x-5">
            <li
              className={"nav-link " + (pathname == "/" && "border-secondary")}
            >
              <Link href="/">
                <p>Home</p>
              </Link>
            </li>
            <li
              className={
                "nav-link " + (pathname == "/ueber" && "border-secondary")
              }
            >
              <Link href="/ueber">
                <p>Über</p>
              </Link>
            </li>
            <li
              className={
                "nav-link " + (pathname == "/funktionen" && "border-secondary")
              }
            >
              <Link href="/funktionen">
                <p>Funktionen</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/4 flex mt-5 sm:mt-0 sm:justify-end">
          <div className="flex space-x-3">
            <Link
              href="/suchen"
              className={
                "btn px-4 " +
                (pathname == "/suchen" ? "btn-active" : "btn-white")
              }
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-base sm:text-lg"
              />
            </Link>
            <Link
              href="/login"
              className={
                "btn text-sm sm:text-base px-5 sm:px-8 " +
                (pathname == "/login" ? "btn-active" : "btn-white")
              }
            >
              Login
            </Link>
            <Link
              href="/registrieren"
              className={
                "btn btn-primary text-sm sm:text-base px-5 sm:px-8" +
                (pathname == "/registrieren" ? "btn-active" : "btn-white")
              }
            >
              Registrieren
            </Link>
            <button
              className="btn btn-white px-4 flex lg:hidden text-sm sm:text-base"
              onClick={handleMenu}
            >
              <FontAwesomeIcon icon={faBars} className="text-base sm:text-lg" />
            </button>
          </div>
        </div>
      </nav>
      <div className="nav-menu hidden w-screen h-screen absolute bg-[#00000062] text-text backdrop-blur-sm z-20">
        <button
          className={
            "btn btn-white px-4 py-2.5 flex lg:hidden top-7 absolute right-8"
          }
          onClick={handleMenu}
        >
          <FontAwesomeIcon icon={faXmark} className="text-lg" />
        </button>
        <ul className="flex flex-col space-y-2 p-4 text-center h-screen justify-evenly py-44">
          <li className="title text-2xl sm:text-4xl">
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          <li className="title text-2xl sm:text-4xl">
            <Link href="/ueber">
              <p>Über</p>
            </Link>
          </li>
          <li className="title text-2xl sm:text-4xl">
            <Link href="/funktionen">
              <p>Funktionen</p>
            </Link>
          </li>
          <li className="title text-2xl sm:text-4xl">
            <Link href="/login">
              <p>Login</p>
            </Link>
          </li>
          <li className="title text-2xl sm:text-4xl">
            <Link href="/erstellen">
              <p>Erstellen</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
