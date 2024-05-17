import {
  faCalendarDays,
  faHandshake,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiAccountGroupOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import CalculateDate from "./CalculateDate";

export default function WichtelDetail({ wichtel }) {
  const {
    name,
    url,
    administrator,
    accountCount,
    createdat,
    joinedat,
    partner,
    started,
  } = wichtel;

  return (
    <Link
      href={`/wichtel/${url}`}
      className="hover:scale-[1.02] transition-all duration-300"
    >
      <div className="bg-background shadow-custom border-2 border-backgroundLight p-4 px-5 rounded-[15px] space-y-0.5">
        <h3 className="title text-xl">{name}</h3>
        {administrator && (
          <div className="flex">
            <FontAwesomeIcon icon={faUser} className="mt-1 mr-1.5 ms-0.5" />
            <p className="text">
              Organisator: {administrator.firstname} {administrator.lastname}
            </p>
          </div>
        )}
        {accountCount != null && (
          <div className="flex">
            <Icon
              path={mdiAccountGroupOutline}
              size={0.8}
              className="mt-1 mr-1"
            />
            <p className="text mt-0.5">{accountCount} Teilnehmer</p>
          </div>
        )}
        {joinedat ? (
          <div className="flex">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="mt-1 mr-2 ms-0.5"
            />
            <p className="text mt-0.5">
              Beigetreten am {CalculateDate(joinedat)}
            </p>
          </div>
        ) : (
          createdat && (
            <div className="flex">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="mt-1 mr-2 ms-0.5"
              />
              <p className="text mt-0.5">
                Erstellt am {CalculateDate(createdat)}
              </p>
            </div>
          )
        )}
        {partner && (
          <div className="flex">
            <FontAwesomeIcon icon={faHandshake} className="mr-1.5 mt-0.5" />
            <p className="text">
              Partner: {partner.firstname} {partner.lastname}
            </p>
          </div>
        )}
        {started != null && (
          <>
            {started ? (
              <div className="flex">
                <FontAwesomeIcon icon={faPlay} className="mr-2 ms-1 mt-0.5" />
                <p className="text">Gestartet</p>
              </div>
            ) : (
              <div className="flex">
                <FontAwesomeIcon icon={faPause} className="mr-2 ms-1 mt-0.5" />
                <p className="text">Noch nicht gestartet</p>
              </div>
            )}
          </>
        )}
      </div>
    </Link>
  );
}
