import { Hash } from "lucide-react";
import MobileToggle from "../mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  type: "channel" | "conversation";
  name: string;
  imageUrl?: string;
}
export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 py-3 h-12 flex items-center border-neutral-200 dark:border-neutral-800 border-b-2 ">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 ml-3" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
};