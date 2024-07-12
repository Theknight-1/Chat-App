"use client";

import {
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";
import React from "react";

interface ActionToolkitProp {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}



const ActionToolkit = ({ label, children, side, align }: ActionToolkitProp) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild className="shadow-2xl">{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLocaleLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ActionToolkit;
