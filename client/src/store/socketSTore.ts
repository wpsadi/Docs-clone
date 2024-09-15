import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";


// export interface UserPrefs {
//   reputation: number
// }

interface ISocketStore {

  hydrated: boolean

  setHydrated(): void;

}


export const useAuthStore = create<ISocketStore>()(
  persist(
    immer((set) => ({
   
      hydrated: false,

      setHydrated() {
        set({hydrated: true})
      },

     

     

     

     
    })),
    {
      name: "socket",
      onRehydrateStorage(){
        return (state, error) => {
          if (!error) state?.setHydrated()
        }
      }
    }
  )
)