export async function generateMetadata() {
  return {
    title: "Über Let's Wichtel | Let's Wichtel",
  };
}

export default function impressumPage() {
  return (
    <div className="flex justify-center max-w-2xl mx-auto mt-10">
      <div className="w-full">
        <h1 className="mb-5 title">Über Let's Wichtel</h1>
        <p className="mb-3 font-semibold text">
          Let's Wichtel ist die ultimative Plattform für die Organisation und
          Durchführung von Wichtelaktionen, sei es für Freunde, Familie oder
          Kollegen.
        </p>
        <p className="mb-3 font-semibold text">
          Mit einer benutzerfreundlichen Oberfläche und einer Vielzahl von
          Funktionen ist Let's Wichtel die beste Wahl für all deine
          Wichtelbedürfnisse.
        </p>
        <p className="mb-3 font-semibold text">
          Let's Wichtel wurde aus der Idee heraus entwickelt, Wichtelaktionen
          einfacher und effizienter zu gestalten, da wir selbst oft genug
          festgestellt haben, dass die Organisation und Durchführung auf anderen
          Plattformen nie befriedigend war.
        </p>
      </div>
    </div>
  );
}
