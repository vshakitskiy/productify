"use client"
 
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
 
const Theme = () => {
  const { setTheme, theme } = useTheme()

  const THEMES = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
    { name: "System", value: "system" },
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 mr-5 text-gray-400 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300">
          <Sun className="h-4 w-4 rotate-0 transition-all dark:-rotate-90 dark:hidden" />
          <Moon className="h-4 w-4 rotate-90 hidden transition-all dark:rotate-0 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((option) => (
          <button 
            key={option.name}
            className={cn("text-left w-full block px-4 py-2 text-sm", {
              "text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-900": option.value === theme,
              "text-gray-500 dark:text-gray-300": option.value !== theme
            })}
            onClick={() => setTheme(option.value)}
          >
            {option.name}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Theme