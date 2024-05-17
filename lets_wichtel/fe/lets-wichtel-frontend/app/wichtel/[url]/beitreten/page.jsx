import JoinController from "@/components/join/JoinController";

export default function wichtelBeitretenPage({ params }) {
  return (
    <div className="flex flex-col mt-6">
      <JoinController url={params.url} />
    </div>
  );
}
