export async function generateMetadata() {
  return {
    title: "Funktionen | Let's Wichtel",
  };
}

export default function impressumPage() {
  return (
    <div className="flex justify-center max-w-2xl mx-auto mt-10">
      <div className="w-full">
        <h1 className="mb-5 title">Funktionen</h1>
        <p className="mb-3 font-semibold text">
          Wir haben uns bemüht, die Plattform so einfach und intuitiv wie
          möglich zu gestalten, mit Funktionen, die dir helfen, deine
          Wichtelaktionen zu organisieren und durchzuführen.
        </p>
        <ul className="mb-3 font-semibold text list-disc [&_li]:ms-4">
          <li>
            Wichtel erstellen mit Optionen wie: Privat, Passwortgeschützt oder
            mit einem benutzerdefinierten Link.
          </li>
          <li>Teilnehmer zu Moderatoren oder Administratoren befördern</li>
          <li>Teilnehmer von einem Wichtel entfernen</li>
          <li>
            Beim start des Wichtels können Personen definiert werden, welche
            nicht zusammen gepaart werden sollen
          </li>
          <li>
            Mehreren Wichteln beizutreten mit individuellen Berechtigungen und
            Wunschlisten
          </li>
          <li>Wunschliste und Adresse vom gepaarten Teilnehmer zu sehen</li>
          <li>Nach wichteln zu suchen</li>
        </ul>
      </div>
    </div>
  );
}
