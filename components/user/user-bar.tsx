import { currentProfile } from '@/lib/current-profile'
import React from 'react'
import UserAvatar from '../user-avatar'
import ActionToolkit from '../action-toolkit'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuPortal } from '@radix-ui/react-dropdown-menu'
import { Pencil, Settings } from 'lucide-react'
import { DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu'

const UserBar = async () => {
    const profile = await currentProfile()

    return (
        <div className='bg-zinc-900/50 p-1 group flex items-center justify-between w-full relative'>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none w-[60%]" asChild>
                    <button className="text-md font-semibold">
                        <div className='hover:bg-slate-700/50 rounded-sm flex items-center gap-2 overflow-hidden p-1'>
                            <UserAvatar src={profile?.imageUrl} show={true} />
                            <div className='pr-1 border-white'>
                                <div className='flex flex-col items-start cursor-pointer rounded-md'>
                                    <p className='text-xs'>{profile?.name?.slice(0, 10) + "..."}</p>
                                    <div className='text-primary/70 h-4 overflow-hidden relative w-full'>
                                        <div className="flex flex-col items-start">
                                            <h6 className='text-xs whitespace-nowrap transition-transform duration-300 ease-in-out group-hover:-translate-y-4'>{profile?.email}</h6>
                                            <h6 className='text-xs whitespace-nowrap transition-transform duration-300 ease-in-out group-hover:-translate-y-4'>Online</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                    <DropdownMenuContent className="w-72 ml-12 mb-3 bg-[#111214] text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] shadow-lg z-[9999] rounded-lg  overflow-hidden">
                        <div className='relative' style={{ height: "105px", minHeight: "105px", backgroundColor: "rgb(236, 68, 68)" }}>
                            <div className='absolute -bottom-6  left-6 p-2 bg-[#111214] rounded-full'>
                                <UserAvatar show={true} greenDotClassName='w-3 h-3' src={profile?.imageUrl} className='md:h-16 md:w-16' />
                            </div>
                        </div>
                        <DropdownMenuGroup className='cursor-pointer p-2 pt-6'>
                            <p className='hover:underline text-base'>{profile?.name}</p>
                            <p className='text-xs  hover:underline'>
                                {profile?.email}
                            </p>
                            <div className='bg-[#232528] p-2 rounded-md mt-2'>
                                <DropdownMenuItem className='flex items-center gap-2 p-2 focus:bg-gray-600'>
                                    <Pencil className='w-4 h-4' />
                                    Edit Profile
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenuPortal>
            </DropdownMenu>

            <div className='pr-2'>
                <ActionToolkit align='center' side='top' label='User Setting'>
                    <Settings className='cursor-pointer w-5 h-5 text-primary transition-transform duration-300 hover:rotate-180' />
                </ActionToolkit>
            </div>
        </div>
    )
}

export default UserBar;
