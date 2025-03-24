"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui";
import { Download, MousePointer2, Settings, Upload } from "lucide-react";
import { useSettings } from "../context";

export const SettingMenu = () => {
  const { toggleSelecting } = useSettings();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Settings className="w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            toggleSelecting(true);
          }}
        >
          <MousePointer2 />
          Select
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download />
          Import
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
