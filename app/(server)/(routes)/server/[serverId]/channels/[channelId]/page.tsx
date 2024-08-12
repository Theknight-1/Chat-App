import { ChatHeader } from "@/components/chat/Chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const channelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect(`/`);
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-4">
      <ChatHeader
        type={"channel"}
        name={channel.name}
        serverId={channel.serverId}
      />
    </div>
  );
};

export default channelIdPage;
