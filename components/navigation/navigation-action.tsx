"use client";
import { Plus } from "lucide-react";
import React from "react";
import ActionToolkit from "../action-toolkit";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <ActionToolkit side="right" align="center" label="add a server">
      <button
        className="group flex items-center"
        onClick={() => {
          onOpen("createServer");
        }}
      >
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500">
          <Plus
            className="group-hover:text-white transition text-indigo-500"
            size={25}
          />
        </div>
      </button>
    </ActionToolkit>
  );
};

export default NavigationAction;
