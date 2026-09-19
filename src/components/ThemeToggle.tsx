import { useThemeContext } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { dark, toggle } = useThemeContext();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed right-5 top-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full glass shadow-card transition-transform hover:scale-110"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
