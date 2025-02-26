import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toogleTheme: () => void;
}

export const useStore = create<ThemeState>((set) => ({
  theme: "light",
  toogleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
