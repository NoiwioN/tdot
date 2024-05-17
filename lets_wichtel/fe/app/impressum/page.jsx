export async function generateMetadata() {
  return {
    title: "Impressum | Let's Wichtel",
  };
}

export default function impressumPage() {
  return (
    <div className="flex justify-center max-w-2xl mx-auto mt-10">
      <div className="w-full">
        <h1 className="mb-5 title">Impressum</h1>
        <p className="mb-3 font-semibold text">
          Website erstellt von Ivo Graber und Levyn Schneider von der
          Schweizerischen Post AG <br />
          Adresse: Engehaldestrasse 26, 3030 Bern <br />
          Kontakt:{" "}
          <a href="mailto:ivo.graber@ict-campus.net">
            ivo.graber@ict-campus.net
          </a>{" "}
          /{" "}
          <a href="mailto:levyn.schneider@ict-campus.net">
            levyn.schneider@ict-campus.net
          </a>
        </p>
        <p className="mb-3 font-semibold text">
          Die Inhaber der lehnen jegliche Haftung gegenüber Links auf der Seite
          ab
        </p>
        <p className="mb-3 font-semibold text">
          Die Bilder auf der Website stammen von:{" "}
          <a href="http://www.freepik.com/">www.freepik.com</a>
        </p>
      </div>
    </div>
  );
}
