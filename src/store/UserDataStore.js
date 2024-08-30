import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserDataStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      setFavorites: (favorites) => set({ favorites }),
      handleClickFavorite: async (song, userId) => {
        try {
          const favorites = get().favorites;

          const isFavorite = favorites?.some(
            (favorite) => favorite.song.idApi === song.idApi
          );

          const favorite = favorites?.find(
            (favorite) => favorite.song.idApi === song.idApi
          );

          const data = {
            idApi: song.idApi,
            title: song.title,
            artist: song.artist,
            album: song.album,
            image: song.image,
            url: song.url,
          };

          if (isFavorite) {
            const res = await axios.delete(
              `/api/favorites/${userId}/${favorite.songId}`
            );
            const getFavorites = await axios.get(`/api/favorites/${userId}`);
            set({ favorites: getFavorites.data.songs });
            toast.success("Removed from favorites");
          } else {
            const res = await axios.patch(`/api/favorites/${userId}`, data);

            const res2 = await axios.get(`/api/favorites/${userId}`);

            set({ favorites: res2.data.songs });
          }
        } catch (error) {
          console.log(error);
        }
      },

      playlists: [],
      setPlaylists: (playlists) => set({ playlists }),

      selectedPlaylist: {},
      setSelectedPlaylist: (selectedPlaylist) => set({ selectedPlaylist }),

      selectedPlaylistSongs: [],
      setSelectedPlaylistSongs: (selectedPlaylistSongs) =>
        set({ selectedPlaylistSongs }),
    }),
    {
      name: "User-Data-Store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
