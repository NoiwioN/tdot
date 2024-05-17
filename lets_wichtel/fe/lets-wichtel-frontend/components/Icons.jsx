import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiAccountGroupOutline } from "@mdi/js";
import Icon from "@mdi/react";
import CalculateDate from "./CalculateDate";

export default function Icons({ wichtel }) {
  return (
    <>
      <div className="flex mb-1 mt-1">
        <FontAwesomeIcon icon={faUser} className="mt-1 mr-1.5 ms-0.5" />
        <p className="text">
          Organisator:{" "}
          {`${wichtel.administrator.firstname} ${wichtel.administrator.lastname}`}
        </p>
      </div>
      <div className="flex">
        <Icon path={mdiAccountGroupOutline} size={0.8} className="mt-1 mr-1" />
        <p className="text mt-0.5">{wichtel.accountCount} Teilnehmer</p>
      </div>
      <div className="flex mb-1">
        <FontAwesomeIcon icon={faCalendarDays} className="mt-1 mr-2 ms-0.5" />
        <p className="text mt-0.5">
          Erstellt am {CalculateDate(wichtel.createdat)}
        </p>
      </div>
      <div className="flex mb-1">
        <FontAwesomeIcon
          icon={wichtel.started === true ? faPlay : faPause}
          className="mr-2 mt-0.5 ms-1"
        />
        <p className="text">
          {wichtel.started === true ? "Gestartet" : "Noch nicht gestartet"}
        </p>
      </div>
    </>
  );
}
