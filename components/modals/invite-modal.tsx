"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import ActionToolkit from "../action-toolkit";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";

const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { isOpen, data, onClose, onOpen, type } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleClose = () => {
    onClose();
  };
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-white p-0 text-black ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase font-bold text-xs text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={loading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <ActionToolkit
              align="center"
              side="right"
              label={`${copied ? "copied" : "copy"}`}
            >
              <Button
                size={"icon"}
                onClick={onCopy}
                className="border relative"
                disabled={loading}
              >
                {copied && (
                  <div className="absolute -top-12  z-10 transition-all duration-300 bg-violet-500 p-2 text-white rounded-md opacity-0 animate-fade-in">
                    <span className="p-2 bg-violet-500 absolute -bottom-1 left-5 -z-10 rotate-45"></span>
                    copied
                  </div>
                )}
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </ActionToolkit>
          </div>
          <Button
            size={"sm"}
            variant="link"
            className="text-zinc-500 mt-4"
            onClick={onNew}
            disabled={loading}
          >
            Generate a new link
            <RefreshCcw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
