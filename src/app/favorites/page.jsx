"use client";

import { Button } from "@nextui-org/react";
import { IoPlay } from "react-icons/io5";
import { motion } from "framer-motion";

import { appearanceAnimation } from "@/constants/appearance-animation-config";
import { useUserDataStore } from "@/store/user-data-store";
import { useMusicAppStore } from "@/store/music-app-store";
import SongCard from "@/components/song-card/song-card";
import { useEffect } from "react";

const FavoritesPage = () => {
  const { favorites } = useUserDataStore();

  const { setSongsArray } = useMusicAppStore();

  const handlePlayFavorites = () => {
    const sanitizedFavorites = favorites.map((favorite) => {
      return favorite.song;
    });

    setSongsArray(sanitizedFavorites);
  };

  useEffect(() => {
    document.title = "MusicApp - Favoritas";
  }, []);

  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl text-content1-foreground">
                Favoritos
              </h1>
              <p className="mt-1.5 mb-4 text-sm">
                Escucha tus canciones favoritas en cualquier momento
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Button
                color="primary"
                variant="light"
                size="lg"
                onPress={handlePlayFavorites}
                isIconOnly
                radius="full"
              >
                <IoPlay className="text-3xl ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-7 justify-items-center sm:gap-8">
            {favorites.map((favorite, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={appearanceAnimation}
              >
                <SongCard
                  key={index}
                  title={favorite.song.title}
                  id={favorite.song.idApi}
                  album={favorite.song.album}
                  artist={favorite.song.artist}
                  image={favorite.song.image}
                  url={favorite.song.url}
                  song={favorite.song}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <h1 className="text-2xl font-bold sm:text-3xl text-foreground/70">
              Aún no tienes canciones favoritas
            </h1>
            <p className="mt-1.5 text-sm text-foreground/70">
              Agrega canciones a tus favoritos para escucharlas en cualquier
              momento
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
