import WichtelsAPI from "@/lib/api/Wichtels";
import { getSession } from "@/lib/session";
import BackButton from "@/components/BackButton";
import WunschlisteForm from "@/components/WunschlisteForm";
import Icons from "@/components/Icons";
import LeaveWichtel from "@/components/LeaveWichtel";

export default async function wichtelLoggedIn({ params }) {
  const session = await getSession();
  const wichtel = await WichtelsAPI.getWichtelByURL(
    params.url,
    session.accessToken
  );

  return (
    <div className="flex flex-col mt-6">
      <div>
        <BackButton />
      </div>
      <div className="flex flex-wrap mt-8 justify-start lg:justify-between">
        <div
          className={
            "flex flex-col w-full " +
            (wichtel.partner ? "sm:w-1/2 lg:w-[30%]" : "md:w-[45%]")
          }
        >
          <div>
            <div className="flex mb-1">
              <h1 className="title">{wichtel.name}</h1>
            </div>
            <Icons wichtel={wichtel} />
            {wichtel.started === true && (
              <p className="mb-3">
                Du kannst den Wichtel nicht mehr verlassen, da der Wichtel
                bereits gestartet wurde.
              </p>
            )}
            <LeaveWichtel session={session} wichtel={wichtel} />
          </div>
        </div>
        {wichtel.partner && (
          <div className="flex flex-col w-full sm:w-1/2 lg:w-[30%] mt-12 sm:mt-0 ps-0 sm:ps-6 lg:ps-0">
            <h1 className="title text-2xl">Partner</h1>
            <p className="text mb-1">
              Dein Partner für diesen Wichtel ist {wichtel.partner.firstname}{" "}
              {wichtel.partner.lastname}.
            </p>
            <h1 className="title text-lg mt-3">Adresse:</h1>
            <p className="text">{wichtel.partner.address}</p>
            <p className="text">
              {wichtel.partner.zip} {wichtel.partner.city}
            </p>
            <h1 className="title text-lg mt-3">Wunschliste:</h1>
            <div className="border-2 border-backgroundLight rounded-[15px] px-3 py-2 mt-1 min-h-32 h-auto">
              <p>{wichtel.partner.wishlist}</p>
            </div>
          </div>
        )}
        <div
          className={
            "flex flex-col w-full mt-12 " +
            (wichtel.partner
              ? "sm:w-1/2 lg:w-[30%] lg:mt-0"
              : "md:w-[45%] md:mt-0")
          }
        >
          <WunschlisteForm session={session} wichtel={wichtel} />
        </div>
      </div>
    </div>
  );
}
