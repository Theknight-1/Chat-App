import React from 'react';
import { Separator } from '../ui/separator';
import DiscoverSidebarItems from './discover-siderbar-item';
import { LayoutGrid, Server, BrainCog } from 'lucide-react';
import UserBar from '../user/user-bar';
import { ScrollArea } from '../ui/scroll-area';

interface ItemProp {
    title: string;
    icon: React.ReactNode;
}

const Items: ItemProp[] = [
    { title: "Apps", icon: <LayoutGrid className="h-5 w-5" /> },
    { title: "Servers", icon: <Server className="h-5 w-5" /> },
    { title: "Quests", icon: <BrainCog className="h-5 w-5" /> },
];

const DiscoverSidebar = () => {
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <h1 className="text-primary/90 text-lg font-semibold p-4">Discover</h1>
            <ScrollArea className='flex-1'>
                <Separator />
                <DiscoverSidebarItems items={Items} />
            </ScrollArea>
            <UserBar  />
        </div>
    );
};

export default DiscoverSidebar;