import { redirect } from "next/navigation";

export default function wichtelBeitretenPage({ params }) {
  redirect("/wichtel/" + params.url);
}
