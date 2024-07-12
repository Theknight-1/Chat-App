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
import {
  Check,
  Copy,
  Crown,
  Divide,
  RefreshCcw,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import ActionToolkit from "../action-toolkit";
import axios from "axios";
import { ServerWithMemberWithProfile } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";

const MembersModal = () => {
  const { isOpen, data, onClose, onOpen, type } = useModal();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMemberWithProfile };
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 font-semibold">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => {
            return (
              <div
                className="flex items-center justify-between mb-6"
                key={member.id}
              >
                <div className="flex items-center gap-2">
                  <UserAvatar src={member.profile.imageUrl} />
                  <div className="flex flex-col font-bold">
                    <div className="flex items-center gap-2">
                      <p>{member.profile.name}</p>
                      {member.role === "ADMIN" ? (
                        <div className=" flex items-center gap-2 font-semibold text-xs text-red-600">
                          [{member.role} <Crown className="w-4 h-4" />]
                        </div>
                      ) : member.role === "MODERATOR" ? (
                        <div>
                          <div className=" flex items-center gap-2 font-semibold text-xs text-green-50">
                            [{member.role} <ShieldCheck className="w-4 h-4" />]
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className=" flex items-center gap-2 font-semibold text-xs">
                            [{member.role} <User className="w-4 h-4" />]
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-xs font-normal text-zinc-500">
                      {member.profile.email}
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
