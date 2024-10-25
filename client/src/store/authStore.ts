import { create } from "zustand";
import { Social, User } from "./types";
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

export function toUser(auth: any): User {
  const { user } = auth;
  return {
    id: Some.String(user?._id),
    name: Some.String(user?.user_name),
    token: Some.String(auth?.token),
    email: Some.String(user?.email),
    phone: Some.String(user?.phone),
    country: Some.String(user?.country),
    yearOfExperience: Some.String(user?.year_of_experience),
    company: Some.String(user?.company),
    skills: Some.Array(user?.skills).map((skill) => Some.String(skill)),
    profilePicture: Some.String(user?.profile_picture),
    about: Some.String(user?.about),
    socials: Some.Array(user?.socials).map(
      (item: any) =>
        ({
          type: Some.String(item?.type),
          link: Some.String(item?.link),
        } as Social)
    ),
  };
}

export { useAuthStore };
