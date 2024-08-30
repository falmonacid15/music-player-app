import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMusicAppStore = create(
  persist(
    (set) => ({
      currentPlaying: null,
      setCurrentPlaying: (currentPlaying) => set({ currentPlaying }),

      songsArray: [],
      setSongsArray: (songsArray) => set({ songsArray }),

      isPlaying: false,
      setIsPlaying: (isPlaying) => set({ isPlaying }),

      selected: null,
      setSelected: (selected) => set({ selected }),
    }),
    {
      name: "Music-App-Store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
