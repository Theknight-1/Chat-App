"use client";

import axios from "axios";
import { useState } from "react";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteChannel";
  const { channel, server } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [channelName, setServerName] = useState("");
  const [warning, setWarning] = useState("");

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (channel?.name === channelName) {
        const url = qs.stringifyUrl({
          url: `/api/channels/${channel?.id}`,
          query: {
            serverId: server?.id,
          },
        });
        await axios.delete(url);
        setIsLoading(false);
        setServerName("");
        setWarning("");
        onClose();
        router.refresh();
        window.location.reload();
        router.push(`/server/${server?.id}`);
      } else {
        setIsLoading(false);
        setWarning("Server name is not correct");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6 space-y-5">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 ">
            Are you sure you want to delete <br />#
            <span className="font-bold text-indigo-500">{channel?.name} ?</span>
          </DialogDescription>
          <Input
            disabled={isLoading}
            className=" bg-zinc-500/50 border-0 outline-none text-black placeholder:text-black focus-visible:ring-offset-0"
            placeholder="Enter the server name to confirm deletion"
            value={channelName}
            onChange={(e) => setServerName(e.target.value)}
          />
          {warning && <h3>Server Name is not correct</h3>}
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={() => {
                onClose();
              }}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              disabled={channel?.name !== channelName}
              onClick={() => {
                onClick();
              }}
              variant={"destructive"}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
