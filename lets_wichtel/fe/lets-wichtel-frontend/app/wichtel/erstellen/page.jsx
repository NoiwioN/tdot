import WichtelCreateForm from "@/components/create/WichtelCreateForm";

export async function generateMetadata() {
  return {
    title: "Wichtel erstellen | Let's Wichtel",
  };
}

export default function erstellenPage() {
  return (
    <div className="flex flex-row justify-center home:justify-between mt-16">
      <div className="w-full sm:w-2/3 home:w-2/5">
        <h1 className="title">Wichtel erstellen</h1>
        <WichtelCreateForm />
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
