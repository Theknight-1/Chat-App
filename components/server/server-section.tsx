"use client";

import { ServerWithMemberWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import ActionToolkit from "../action-toolkit";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProp {
  label: string;
  role?: MemberRole;
  channelType?: ChannelType;
  sectionType: "channels" | "members";
  server?: ServerWithMemberWithProfile;
}
export const ServerSection = ({
  label,
  role,
  channelType,
  sectionType,
  server,
}: ServerSectionProp) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionToolkit label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zink-300 transition"
          >
            <Plus className="w-4 h-4 " />
          </button>
        </ActionToolkit>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionToolkit label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zink-300 transition"
          >
            <Settings className="w-4 h-4 " />
          </button>
        </ActionToolkit>
      )}
    </div>
  );
};
