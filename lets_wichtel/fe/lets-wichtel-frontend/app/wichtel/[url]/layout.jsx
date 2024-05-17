import WichtelsAPI from "@/lib/api/Wichtels";
import { getSession } from "@/lib/session";

export default async function wichtelLayout({
  children,
  admin,
  moderator,
  user,
  params,
}) {
  const session = await getSession();
  if (session == null) return <>{children}</>;

  const wichtel = await WichtelsAPI.getWichtelByURL(params.url);
  const role = await WichtelsAPI.getRoleInWichtel(
    wichtel.id_wichtel,
    session.accessToken
  ).catch((err) => {
    console.log(err);
    return null;
  });
  if (!role) return <>{children}</>;

  switch (role.role.name) {
    case "Administrator":
      return <>{admin}</>;
    case "Moderator":
      return <>{moderator}</>;
    case "User":
      return <>{user}</>;
    default:
      return <>{children}</>;
  }
}
