import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return <RedirectToSignIn />;
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      OR: [
        {
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
        {
          AND: [
            {
              id: params.serverId,
            },
            {
              public: true,
            }
          ]
        }
      ]
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/server/${params?.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
