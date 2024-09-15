// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import apiAxios from "@/helpers/axiosInstance";

// export interface UserPrefs {
//   reputation: number
// }

interface IDocStore {
  hydrated: boolean;
  docs: {
    id: string;
    title: string;
    key: string;
    createdAt: string;
  }[];
  getDocData(
    id: string,
    key: string
  ): Promise<{
    title: string;
    content: string;
    id: string;
    key: string;
  }>;
  getviewDocData(
    id: string,
    key: string
  ): Promise<{
    title: string;
    content: string;
    id: string;
  }>;
  updateTitle(id: string, key: string, title: string): Promise<void>;
  deleteDoc(id: string, key: string): Promise<void>;
  setHydrated(): void;
  listDocs(): Promise<
    {
      id: string;
      title: string;
      key: string;
      createdAt: string;
    }[]
  >;
  createNewDoc(): void;
}

export const useDocStore = create<IDocStore>()(
  persist(
    immer((set) => ({
      hydrated: false,
      docs: [],
      createNewDoc() {
        const baseURL = String(process.env.VITE_API_ENPOINT);
        const url = `${baseURL.substring(1, baseURL.length - 1)}/docs/new`;
        // // console.log(url);
        window.location.href = url;
      },

      async listDocs() {
        let isLoaded = true;
        const result = await await apiAxios.get("/docs/list").catch(() => {
          isLoaded = false;
        });

        // // console.log(result)
        if (!isLoaded) {
          set({ docs: [] });
        }
        set({ docs: result?.data });
        return result?.data;
      },

      async getDocData(id: string, key: string) {
        let isLoaded = true;
        const result = await await apiAxios
          .get(`/docs/${id}/${key}`)
          .catch((e) => {
            // console.log(e)

            isLoaded = false;
          });

        // // console.log(result)
        if (!isLoaded) {
          throw new Error("Failed to get document content");
        }

        return result!.data;
      },

      async getviewDocData(id: string) {
        let isLoaded = true;
        const result = await await apiAxios.get(`/docs/${id}`).catch((e) => {
          // console.log(e)

          isLoaded = false;
        });

        // // console.log(result)
        if (!isLoaded) {
          throw new Error("Failed to get document content");
        }

        return result!.data;
      },

      async updateTitle(id: string, key: string, title: string) {
        let isLoaded = true;
        const result = await await apiAxios
          .put(`/docs/${id}/${key}`, { title })
          .catch((e) => {
            // console.log(e)

            isLoaded = false;
          });

        // console.log(result.data)
        // // console.log(result)
        if (!isLoaded) {
          throw new Error("Failed to update title");
        }
      },

      async deleteDoc(id: string, key: string) {
        let isLoaded = true;
        let authorizationError = false;
        const result = await await apiAxios
          .delete(`/docs/${id}/${key}`)
          .catch((e) => {
            // console.log(e)
            if (e.response.status === 401) {
              authorizationError = true;
            }
            isLoaded = false;
          });

        // console.log(result)

        if (authorizationError) {
          throw new Error("Only the owner can delete the document");
        }

        if (!isLoaded) {
          throw new Error("Failed to delete document");
        }
      },

      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "doc",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
