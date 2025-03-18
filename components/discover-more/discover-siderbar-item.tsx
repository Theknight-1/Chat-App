"use client";
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface ItemProp {
    title: string;
    icon: React.ReactNode;
}

const DiscoverSidebarItems = ({ items }: { items: ItemProp[] }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (title: string) => {
        router.push(`/discovery/${title.toLowerCase()}`);
    };

    return (
        <div className="flex flex-col gap-1">
            {items.map((item, index) => {
                const isActive = pathname === `/discovery/${item.title.toLowerCase()}`;
                return (
                    <div
                        onClick={() => handleClick(item.title)}
                        key={index}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-sm cursor-pointer mx-1",
                            isActive ? "bg-gray-700" : "hover:bg-gray-700"
                        )}
                    >
                        <span className="text-primary/90">{item.icon}</span>
                        <h1 className="text-primary/90">{item.title}</h1>
                    </div>
                );
            })}
        </div>
    );
};

export default DiscoverSidebarItems;