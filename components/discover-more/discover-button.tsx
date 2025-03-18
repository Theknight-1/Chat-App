"use client";
import React from 'react'
import ActionToolkit from '../action-toolkit'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'

const DiscoverButton = () => {
    const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/discovery`);
  };
  return (
    <ActionToolkit side="right" align="center" label={"Discover"}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-full rounded-r-full transition-all w-[4px]",
            
          )}
        />
        <div
          className={cn(
            "relative group mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden flex items-center justify-center",
            
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Compass className="flex-shrink-0 w-5 h-5 fill-white text-white dark:text-zinc-100" />
        </div>
      </button>
    </ActionToolkit>
  )
}

export default DiscoverButton