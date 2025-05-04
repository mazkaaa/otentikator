"use client";
import { Download, MousePointer2, Settings } from "lucide-react";
import { useSettings } from "../context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SettingMenu = () => {
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

export default SettingMenu;
