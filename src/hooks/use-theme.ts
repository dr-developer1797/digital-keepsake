import { useEffect, useState } from "react";

const STORAGE_KEY = "keepsake-theme";

function readStoredDark(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "dark";
}

export function useTheme() {
  const [dark, setDark] = useState(readStoredDark);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, "light");
    }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}
