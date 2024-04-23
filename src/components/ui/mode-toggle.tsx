import React from "react";
import { Moon, Sun, BriefcaseBusiness, PartyPopper } from "lucide-react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { setTheme, setFun } = useTheme();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <BriefcaseBusiness
              className={`absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all ${
                localStorage.getItem("fun-mode") === "business" && "!scale-100"
              }`}
            />
            <PartyPopper
              className={`h-[1.2rem] w-[1.2rem] scale-100 transition-all ${
                localStorage.getItem("fun-mode") === "business" && "!scale-0"
              } `}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setFun("party")}>
            Party 🎉
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFun("business")}>
            Business 🕴️
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
