import AccountForm from "@/components/AccountForm";
import { getSession } from "@/lib/session";

export async function generateMetadata() {
  return {
    title: "Dein Account | Let's Wichtel",
  };
}

export default async function accountPage() {
  const session = await getSession()
  return (
    <div className="flex flex-row justify-center home:justify-between mt-16">
      <div className="w-full sm:w-1/2 home:w-2/5">
        <h1 className="title">Dein Account</h1>
        <AccountForm session={session}/>
      </div>
      <div className="w-1/2 justify-end hidden home:flex">
        <img
          src="/santa/santa-3.png"
          alt="Illustration"
          className="w-11/12 mt-6 lg:mt-0 lg:w-5/6 h-auto"
        />
      </div>
    </div>
  );
}
