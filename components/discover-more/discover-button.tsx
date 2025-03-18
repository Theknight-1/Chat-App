"use client";
import React from 'react';
import ActionToolkit from '../action-toolkit';
import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';

const DiscoverButton = () => {
  const router = useRouter();
  const pathname = usePathname(); // Renamed 'path' to 'pathname' for clarity

  const onClick = () => {
    router.push(`/discovery`);
  };

  // Check if the current path is /discovery or a subroute
  const isDiscoveryActive = pathname === '/discovery' || pathname?.startsWith('/discovery/');

  return (
    <ActionToolkit side="right" align="center" label={"Discover"}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-full rounded-r-full transition-all w-[4px]",
            pathname !== "/discovery" && "group-hover:h-[20px]",
            isDiscoveryActive ? "h-[36px]" : "h-[8px]" 
          )}
        />
        <div
          className={cn(
            "relative group mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden flex items-center justify-center",
            "bg-primary/10 text-primary rounded-[16px]",
            pathname !== "/" && "group-hover:bg-[#5865F2]", 
            isDiscoveryActive && "bg-[#5865F2]"
          )}
        >
          <Compass className="flex-shrink-0 w-5 h-5 text-white dark:text-zinc-100" />
        </div>
      </button>
    </ActionToolkit>
  );
};

export default DiscoverButton;