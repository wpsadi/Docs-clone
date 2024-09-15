// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { io, Socket } from "socket.io-client";

interface ISocketStore {
  socket: Socket | null;
  createConnection(id :string , key:string): void;
  closeSocket(): void;
  hydrated: boolean;

  setHydrated(): void;
}

export const useSocketStore = create<ISocketStore>()(
  persist(
    immer((set, get) => ({
      socket: null,
      createConnection(id,key) {
        // Keep the socket only in memory, not in local storage
        const socket = io("http://localhost:3000");

        socket.on("connect", () => {
          // console.log("connected");
        });
        socket.on("message", (message) => {
          // console.log(message);
        });

        socket.emit("join-doc", {
            id,
            key,
        });

        // Use set to update socket but exclude it from persistence
        set((state) => {
          state!.socket = socket; // Stored in-memory, not persisted
        });
      },

      closeSocket() {
        get().socket?.disconnect();
        set((state) => {
          state.socket = null;
        });
      },

      hydrated: false,

      setHydrated() {
        set((state) => {
          state.hydrated = true;
        });
      },
    })),
    {
      name: "socket",
      partialize: (state) => ({ hydrated: state.hydrated }), // Only persist 'hydrated'
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
