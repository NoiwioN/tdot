import RegisterHandler from "@/components/register/RegisterHandler";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Registrieren | Let's Wichtel",
  };
}

export default function registrierenPage() {
  return (
    <div className="flex flex-row justify-center home:justify-between mt-16">
      <div className="w-full sm:w-3/4 lg:w-2/5">
        <h1 className="title">Registrieren</h1>
        <RegisterHandler />
        <p className="text mt-3">
          Hast du bereits einen Account?{" "}
          <Link href="/login" className="text-secondary">
            Login
          </Link>
        </p>
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
