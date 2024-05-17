import BackButton from "@/components/BackButton";
import WichtelCreateForm from "@/components/create/WichtelCreateForm";
import WichtelsAPI from "@/lib/api/Wichtels";
import { getSession } from "@/lib/session";

export async function generateMetadata() {
  return {
    title: "Wichtel bearbeiten | Let's Wichtel",
  };
}

export default async function bearbeitenPage({ params }) {
  const session = await getSession();

  const wichtel = await WichtelsAPI.getWichtelByURL(
    params.url,
    session.accessToken
  );

  console.log(wichtel);

  return (
    <div className="mt-8">
      <BackButton />
      <div className="flex flex-row justify-center home:justify-between mt-6">
        <div className="w-full sm:w-2/3 home:w-2/5">
          <h1 className="title">
            <span className="text-secondary">{wichtel.name}</span> bearbeiten
          </h1>
          <WichtelCreateForm wichtel={wichtel} session={session} />
        </div>
        <div className="w-1/2 justify-end hidden home:flex">
          <img
            src="/santa/santa-3.png"
            alt="Illustration"
            className="w-11/12 mt-6 lg:mt-0 lg:w-5/6 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
