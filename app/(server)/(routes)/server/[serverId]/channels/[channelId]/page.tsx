import { ChatHeader } from "@/components/chat/Chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
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

  if (!channel) {
    return redirect("/");
  }

  // Check if user is a member or if server is public
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
    }
  });

  if (!server) {
    return redirect("/");
  }

  // Get member if user is a member (for chat functionality)
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  // If user is not a member and server is not public, redirect
  if (!member && !server.public) {
    return redirect("/");
  }

  // Create a guest member for public server access
  const guestMember = member || {
    id: "guest",
    role: MemberRole.GUEST,
    profileId: profile.id,
    serverId: params.serverId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type={"channel"}
        name={channel.name}
        serverId={channel.serverId}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={guestMember}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            disabled={!member}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default channelIdPage;
