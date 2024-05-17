import ContactForm from "@/components/ContactForm";

export async function generateMetadata() {
  return {
    title: "Kontakt | Let's Wichtel",
  };
}

export default function kontaktPage() {
  return (
    <div className="flex flex-row justify-center home:justify-between mt-16">
      <div className="w-full sm:w-1/2 home:w-2/5">
        <h1 className="title">Kontakt</h1>
        <ContactForm />
      </div>
      <div className="w-1/2 justify-end hidden home:flex">
        <img
          src="/santa/santa-5.png"
          alt="Illustration"
          className="w-11/12 mt-6 lg:mt-0 lg:w-5/6 h-auto"
        />
      </div>
    </div>
  );
}
