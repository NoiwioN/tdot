import React from "react";

export async function generateMetadata() {
  return {
    title: "Datenschutzerklärung | Let's Wichtel",
  };
}

export default function page() {
  return (
    <div className="flex justify-center max-w-2xl mx-auto mt-10">
      <div className="w-full">
        <h1 className="mb-5 title">Datenschutzerklärung</h1>
        <div className="text">
          <p>
            Die für die Datenverarbeitung verantwortlichen sind die Inhaber der
            Seite
          </p>
          <p>
            Die Daten die auf dieser Seite gesammelt sind, sind: E-Mails,
            Passwörter, Vornamen und Nachnamen <br />
            Die Daten werden nur für die Funktionalität der Website erhoben.{" "}
          </p>
          <p>
            Die Daten werden nicht an Dritte weitergegeben und werden auch nicht
            von Dritten weiterverarbeitet. <br />
            Die Daten werden so lange das Konto besteht in einer Datenbank
            gespeichert.
          </p>
          <p>
            Indem sie ein Konto erstellen willigen sie ein, dass die eben
            genannten Daten von ihnen gesammelt und zu den eben genannten
            Zwecken verwendet werden.
          </p>
        </div>
      </div>
    </div>
  );
}
