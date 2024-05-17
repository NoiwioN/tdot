import SearchForm from "@/components/SearchForm";
import WichtelResults from "@/components/WichtelResults";

export async function generateMetadata() {
  return {
    title: "Suchen | Let's Wichtel",
  };
}

export default function suchenPage() {
  return (
    <div className="flex flex-col mt-4 home:mt-8">
      <h1 className="title font-black text-4xl">Wichtel suchen</h1>
      <SearchForm />
      <WichtelResults />
    </div>
  );
}
