"use client";

import React from 'react';
import UserAvatar from '../user-avatar';
import ActionToolkit from '../action-toolkit';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuPortal } from '@radix-ui/react-dropdown-menu';
import { Pencil, Settings } from 'lucide-react';
import { DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

interface UserBarClientProps {
    profile: {
        name?: string;
        email?: string;
        imageUrl?: string;
    } | null;
}

const UserBarClient = ({ profile }: UserBarClientProps) => {


    return (
        <>
            <div className="dark:bg-zinc-900/50 p-1 group flex items-center justify-between w-full relative">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none w-[60%]" asChild>
                        <button className="text-md font-semibold">
                            <div className="hover:bg-slate-700/50 rounded-sm flex items-center gap-2 overflow-hidden p-1">
                                <UserAvatar src={profile?.imageUrl} show={true} />
                                <div className="pr-1 border-white">
                                    <div className="flex flex-col items-start cursor-pointer rounded-md">
                                        <p className="text-xs">{profile?.name?.slice(0, 10) + "..."}</p>
                                        <div className="text-primary/70 h-4 overflow-hidden relative w-full">
                                            <div className="flex flex-col items-start">
                                                <h6 className="text-xs whitespace-nowrap transition-transform duration-300 ease-in-out group-hover:-translate-y-4">
                                                    {profile?.email}
                                                </h6>
                                                <h6 className="text-xs whitespace-nowrap transition-transform duration-300 ease-in-out group-hover:-translate-y-4">
                                                    Online
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuContent className="w-72 ml-12 mb-3 bg-[#111214] text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] shadow-lg z-[9999] rounded-lg overflow-hidden">
                            <div className="relative" style={{ height: "105px", minHeight: "105px", backgroundColor: "rgb(236, 68, 68)" }}>
                                <div className="absolute -bottom-10 left-6 p-2 bg-[#111214] rounded-full">
                                    <div className="rounded-full">
                                        <UserAvatar
                                            show={true}
                                            greenDotClassName="w-3 h-3"
                                            src={profile?.imageUrl}
                                            className="md:h-16 md:w-16 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DropdownMenuGroup className="cursor-pointer p-4 pt-12 text-white">
                                <p className="hover:underline text-base">{profile?.name}</p>
                                <p className="text-xs hover:underline">{profile?.email}</p>
                                <div className="bg-[#232528] p-2 rounded-md mt-2 space-y-1">
                                    <DropdownMenuItem
                                        className="flex items-center text-sm text-gray-300 cursor-pointer gap-2 p-2 focus:bg-gray-600"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit Profile
                                    </DropdownMenuItem>
                                    <Separator className="bg-gray-700/60" />
                                    <DropdownMenuItem className="flex items-center text-sm text-gray-300 cursor-pointer gap-2 p-2 focus:bg-gray-600">
                                        <svg
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M15.3 14.48c-.46.45-1.08.67-1.86.67h-1.39V9.2h1.39c.78 0 1.4.22 1.86.67.46.45.68 1.22.68 2.31 0 1.1-.22 1.86-.68 2.31Z"
                                            />
                                            <path
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm1 15h2.04V7.34H6V17Zm4-9.66V17h3.44c1.46 0 2.6-.42 3.38-1.25.8-.83 1.2-2.02 1.2-3.58s-.4-2.75-1.2-3.58c-.79-.83-1.92-1.25-3.38-1.25H10Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Copy User ID
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>

                <div className="pr-2">
                    <ActionToolkit align="center" side="top" label="User Setting">
                        <Settings className="cursor-pointer w-5 h-5 text-primary transition-transform duration-300 hover:rotate-180" />
                    </ActionToolkit>
                </div>
            </div>
        </>
    );
};

export default UserBarClient;