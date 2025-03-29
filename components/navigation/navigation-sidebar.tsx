"use client";

import React, { useEffect, useState } from "react";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import DiscoverButton from "../discover-more/discover-button";
import { usePathname } from "next/navigation";
import { Server } from "@prisma/client";

const NavigationSidebar = () => {
  const [memberServers, setMemberServers] = useState<Server[]>([]);
  const [currentPublicServer, setCurrentPublicServer] = useState<Server | null>(null);
  const pathname = usePathname();

  // Extract serverId from the URL pattern /server/[serverId]/...
  const serverIdMatch = pathname?.match(/\/server\/([^\/]+)/);
  const serverId = serverIdMatch ? serverIdMatch[1] : null;

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch("/api/servers");
        const data = await response.json();
        setMemberServers(data);

        if (serverId) {
          const publicServerResponse = await fetch(`/api/servers/${serverId}`);
          const publicServerData = await publicServerResponse.json();
          if (publicServerData && publicServerData.public) {
            setCurrentPublicServer(publicServerData);
          }
        }
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();
  }, [serverId]);

  return (
    <div className="w-full h-full bg-[#515255] dark:bg-[#1E1F22] text-white flex flex-col items-center py-4 space-y-3 ">
      <NavigationAction />
      {currentPublicServer && (
        <div className="mb-4">
          <NavigationItem
            id={currentPublicServer.id}
            name={currentPublicServer.name}
            imageUrl={currentPublicServer.imageUrl}
          />
        </div>
      )}
      <Separator className="h-[2px] bg-zink-300 dark:bg-zinc-700 rounded-md w-8 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {memberServers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
        <DiscoverButton />
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[40px] w-[40px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
