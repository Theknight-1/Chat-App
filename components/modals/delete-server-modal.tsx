"use client";

import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [serverName, setServerName] = useState("");
  const [warning, setWarning] = useState("");

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (server?.name === serverName) {
        await axios.delete(`/api/servers/${server?.id}`);
        setIsLoading(false);
        setServerName("");
        setWarning("");
        onClose();
        router.refresh();
        router.push("/");
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
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 ">
            Are you sure you want to delete{" "}
            <span className="font-bold text-indigo-500">{server?.name} ?</span>
          </DialogDescription>
          <Input
            disabled={isLoading}
            className=" bg-zinc-500/50 border-0 outline-none text-black placeholder:text-black focus-visible:ring-offset-0"
            placeholder="Enter the server name to confirm deletion"
            value={serverName}
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
              disabled={server?.name !== serverName}
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
