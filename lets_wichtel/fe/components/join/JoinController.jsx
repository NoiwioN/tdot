import { getSession } from "@/lib/session";
import JoinHandler from "./JoinHandler";

export default async function JoinController({ url }) {
  const session = await getSession();

  return <JoinHandler url={url} session={session} />;
}
