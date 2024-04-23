import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type Fun = "party" | "business";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultFunTheme?: Fun;
  storageKey?: string;
  storageFunKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fun: Fun;
  setFun: (fun: Fun) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  fun: "business",
  setFun: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultFunTheme = "business",
  storageKey = "vite-ui-theme",
  storageFunKey = "fun-mode",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [fun, setFun] = useState<Fun>(
    () => (localStorage.getItem(storageFunKey) as Fun) || defaultFunTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark", "party", "business");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      root.classList.add(fun);
      return;
    }

    root.classList.add(theme);
    root.classList.add(fun);
  }, [theme, fun]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    fun,
    setFun: (fun: Fun) => {
      localStorage.setItem(storageFunKey, fun);
      setFun(fun);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
