import { create } from "zustand";

interface User {
  username: string;
  uid: string;
  avatarURL: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

interface ThemeState {
  theme: "light" | "dark";
  toogleTheme: () => void;
}

type AppState = AuthState & ThemeState;

export const useStore = create<AppState>((set) => ({
  user: null,
  error: null,
  setUser: (user: User | null) => set({ user }),
  setError: (error: string | null) => set({ error }),
  theme: "light",
  toogleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
