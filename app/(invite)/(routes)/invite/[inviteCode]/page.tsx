import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: {
    InviteCode: string;
  };
}
const InviteCodePage = async ({ params }: InviteCodeProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return <RedirectToSignIn />;
  }
  if (!params.InviteCode) {
    return redirect("/");
  }
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.InviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) {
    return redirect(`/server/${existingServer.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: params.InviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });
  if (server) {
    return redirect(`s/erver/${server.id}`);
  }
  return null;
};
export default InviteCodePage;
