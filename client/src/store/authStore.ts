import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import apiAxios from "@/helpers/axiosInstance";

interface IAuthStore {
  hydrated: boolean;
  accountLoading: boolean;
  accountId: string;
  isLoggedIn: boolean | null;
  reinstateSession(): void;
  logout(): void;
  initiateGitHubAuth(): void;
  setHydrated(): void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      hydrated: false,
      accountLoading: false,
      accountId: "",
      isLoggedIn: null,
      initiateGitHubAuth() {
        const baseURL = String(process.env.VITE_API_ENPOINT);
        const url = `${baseURL.substring(1, baseURL.length - 1)}/auth/github`;
        // // console.log(url);
        window.location.href = url;
      },
      async reinstateSession() {
        try {
          set({ accountLoading: true });
          apiAxios
            .get("/auth/me")
            .then((result) => {
              const data = result.data;
              // // console.log("Setting account loggedIn Info",data)
              // // console.log(result)

              set({
                accountId: data.id,
                isLoggedIn: true,
                accountLoading: false,
              });
            })
            .catch(() => {
              // // console.log("Clearing account loggedIn Info")
              set({ accountId: "", isLoggedIn: false, accountLoading: false });
            });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          set({ accountId: "", isLoggedIn: false });
          // console.log(err?.message)
        }
      },
      logout() {
        const baseURL = String(process.env.VITE_API_ENPOINT);
        const url = `${baseURL.substring(1, baseURL.length - 1)}/auth/logout`;
        // // console.log(url);
        window.location.href = url;
      },
      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
