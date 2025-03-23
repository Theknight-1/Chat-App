"use client"
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSocket } from "./providers/socket-provider";
interface UserAvatarProps {
  src?: string;
  show?: boolean
  className?: string;
  greenDotClassName?: string
}
const UserAvatar = ({ src, className, greenDotClassName, show = false }: UserAvatarProps) => {
  const { isConnected } = useSocket();
  return (
    <div className="relative rounded-full">
      <Avatar className={cn("h-7 w-7  md:h-10 md:w-10", className)}>
        <AvatarImage src={src} />
      </Avatar>
      {show &&
        (isConnected ?
          <div className={cn("absolute bottom-1 right-1 w-2  h-2 rounded-full bg-green-500", greenDotClassName)} />
          :
          <div className={cn("absolute bottom-1 right-1 w-2  h-2 rounded-full bg-yellow-500", greenDotClassName)} />)
      }
    </div>
  );
};
export default UserAvatar;
