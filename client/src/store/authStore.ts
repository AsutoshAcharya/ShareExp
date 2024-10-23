import { create } from "zustand";
import { User } from "./types";
import { devtools, persist } from "zustand/middleware";
import { Some } from "../helpers/Some";

export type StoreState = {
  user: User;
  login: (user: User) => void;
  logOut: () => void;
};
const emptyUser = toUser({});

const useAuthStore = create<
  StoreState,
  [["zustand/devtools", StoreState], ["zustand/persist", StoreState]]
>(
  devtools(
    persist(
      (set, _get) => ({
        user: emptyUser,
        login: (user) => set((_store) => ({ user })),
        logOut: () => set(() => ({ user: emptyUser })),
      }),
      { name: "auth-store" }
    )
  )
);

export function toUser(data: any): User {
  return {
    name: Some.String(data?.user_name),
    email: Some.String(data?.email),
  };
}

export { useAuthStore };
