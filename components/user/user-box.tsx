"use client";

import { ServerWithMemberWithProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
    ChevronDown,
    LogOut,
    PlusCircle,
    Settings,
    Trash,
    UserPlus,
    Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    role?: MemberRole;
}

const UserBox = ({ role }: ServerHeaderProps) => {
    const { onOpen } = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="group w-full text-md font-semibold flex items-center  border-neutral-200 dark:border-neutral-800 border-b-2 transition">
                    
                    <Settings className='cursor-pointer w-5 h-5 text-primary transition-transform duration-900 hover:rotate-180' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                User's Profile
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserBox;
