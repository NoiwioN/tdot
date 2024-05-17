import AccountsAPI from "@/lib/api/Accounts";
import WichtelsAPI from "@/lib/api/Wichtels";
import WichtelDetail from "./WichtelDetail";
import { getSession } from "@/lib/session";
import RefreshButton from "./RefreshButton";

export default async function HomeLoggedIn() {
  const session = await getSession();

  const account = await AccountsAPI.getAccount(session.accessToken);
  const wichtels = await WichtelsAPI.getAllWichtelJoined(session.accessToken);

  return (
    <div className="flex flex-col mt-4 home:mt-10">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between">
          <h1 className="title font-black text-4xl">
            Hey {account.firstname}!
          </h1>
          <RefreshButton />
        </div>
        {wichtels.length !== 0 ? (
          <>
            <h1 className="text">Hier sind deine Wichtel:</h1>
            <div className="flex flex-row flex-wrap gap-3 mt-4">
              {wichtels.map((wichtel) => (
                <WichtelDetail key={wichtel.id_wichtel} wichtel={wichtel} />
              ))}
            </div>
          </>
        ) : (
          <h1 className="text mt-4">
            Trete Wichteln bei, um diese hier zu sehen!
          </h1>
        )}
      </div>
    </div>
  );
}
