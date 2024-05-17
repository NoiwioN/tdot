import BackButton from "@/components/BackButton";
import EditWichtel from "@/components/EditWichtel";
import Icons from "@/components/Icons";
import RemoveAccountFromWichtel from "@/components/RemoveAccountFromWichtel";
import StartWichtel from "@/components/StartWichtel";
import UpdateRole from "@/components/UpdateRole";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WichtelsAPI from "@/lib/api/Wichtels";
import { getSession } from "@/lib/session";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function wichtelLoggedInAdmin({ params }) {
  const session = await getSession();

  const wichtel = await WichtelsAPI.getWichtelByURL(
    params.url,
    session.accessToken
  );

  const accounts = await WichtelsAPI.getAccountsInWichtel(
    wichtel.id_wichtel,
    session.accessToken
  );

  if (!wichtel) return null;

  return (
    <div className="flex flex-col mt-6">
      <div>
        <BackButton />
      </div>
      <div className="flex flex-wrap mt-8 justify-start lg:justify-between">
        <div className="flex flex-col w-full sm:w-1/2 lg:w-[30%]">
          <div>
            <div className="flex">
              <h1 className="title">{wichtel.name}</h1>
            </div>
            <Icons wichtel={wichtel} />
            <EditWichtel session={session} wichtel={wichtel} />
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-[30%] mt-12 sm:mt-0 ps-0 sm:ps-6 lg:ps-0">
          <h1 className="title text-2xl">
            Teilnehmer ({wichtel.accountCount})
          </h1>
          <Accordion
            className="border-2 rounded-xl border-backgroundLight shadow-custom bg-background mt-1"
            type="single"
            collapsible
          >
            {accounts !== null && (
              <>
                {accounts.map((account, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={account.id_account}
                  >
                    <AccordionTrigger>
                      <p className="mt-0.5">
                        {account.firstname} {account.lastname}
                      </p>
                    </AccordionTrigger>
                    <RemoveAccountFromWichtel
                      account={account}
                      session={session}
                      wichtel={wichtel}
                    />
                    <AccordionContent>
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-row">
                          <p className="btn btn-white py-0.5 pt-[5px] text-xs px-4 rounded-md hover:opacity-100">
                            {account.role.name}
                          </p>
                          <UpdateRole
                            account={account}
                            wichtel={wichtel}
                            session={session}
                          />
                        </div>
                        <div>
                          <h4 className="title text-base">E-Mail:</h4>
                          <p>{account.email}</p>
                        </div>
                        <div>
                          <h4 className="title text-base">Adresse:</h4>
                          <p>{account.address}</p>
                          <p>
                            {account.zip} {account.city}
                          </p>
                        </div>
                        <div>
                          <h4 className="title text-base">Wunschliste:</h4>
                          <div className="border-2 border-backgroundLight rounded-lg px-3 py-2 mt-1 min-h-32 h-auto">
                            <p>{account.wishlist}</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </>
            )}
          </Accordion>
        </div>
        {wichtel.started === false ? (
          <div className="flex flex-col w-full mt-12 md:w-1/2 lg:w-[30%] lg:mt-0">
            <h1 className="title text-2xl">Wichtel starten</h1>
            <p className="text mt-0.5 text-sm">
              Du hast hier die Möglichkeit, Personen auszuwählen, die nicht
              miteinander gepaart werden sollen.
            </p>
            <StartWichtel wichtel={wichtel} session={session} />
          </div>
        ) : (
          <div className="flex flex-col w-full mt-12 sm:w-1/2 lg:w-[30%] lg:mt-0">
            <h1 className="title text-2xl">Zuteilungen</h1>
            <div className="border-2 rounded-xl border-backgroundLight shadow-custom bg-background mt-1">
              <div className="flex flex-col space-y-1 py-1.5">
                {wichtel.accounts.length !== null && (
                  <>
                    {wichtel.accounts.map((account) => (
                      <div
                        key={account.id_account}
                        className="flex flex-row items-center gap-2 px-4 py-1"
                      >
                        <p>
                          {account.firstname} {account.lastname}
                        </p>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-sm"
                        />
                        <p>
                          {account.partner.firstname} {account.partner.lastname}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
