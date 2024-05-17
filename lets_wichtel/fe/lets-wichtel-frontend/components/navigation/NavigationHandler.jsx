import { getSession } from "@/lib/session";
import NavigationLoggedIn from "./NavigationLoggedIn";
import NavigationLoggedOut from "./NavigationLoggedOut";

export default async function NavigationHandler() {
  const session = await getSession();

  return session ? <NavigationLoggedIn /> : <NavigationLoggedOut />;
}
