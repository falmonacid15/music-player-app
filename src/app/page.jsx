"use client";
import BentogridPlaylists from "@/components/pages/home/bentogrid-playlists";
import { useUserDataStore } from "@/store/UserDataStore";
import { Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PlayListCard from "./playlists/components/playlist-card";
import SongCard from "@/components/song-card/SongCard";
import { motion } from "framer-motion";
import { appearanceAnimation } from "@/constants/appearance-animation-config";

const MotionCard = motion(Card);

export default function Home() {
  const { status, data: session } = useSession();

  const { setFavorites, favorites, playlists, setPlaylists } =
    useUserDataStore();

  const searchUserData = async () => {
    const favorites = await axios.get(`/api/favorites/${session.user.id}`);
    if (favorites.data.songs.length > 0) {
      setFavorites(favorites.data.songs);
    }

    const playlists = await axios.get(
      `/api/playlists/?user=${session.user.id}`
    );

    if (playlists.data.length > 0) {
      setPlaylists(playlists.data);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      searchUserData();
    }
  }, [status]);

  return (
    <div className="flex flex-col">
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-medium sm:text-3xl text-content1-foreground">
                Bienvenido{" "}
                <span className="font-extrabold">{session?.user.name}</span>
              </h1>

              <p className="mt-1.5 text-sm">
                Ven y disfruta de tu musica favorita
              </p>
            </div>
          </div>
        </div>
      </header>

      {status === "authenticated" ? (
        <>
          <div className="">
            <h1 className="text-2xl font-bold sm:text-3xl text-content1-foreground">
              Favoritas
              <span className="font-extrabold ml-4">
                ( {favorites.length} )
              </span>
              <p className="mt-1.5 text-sm font-medium">
                Disfruta de tus canciones favoritas
              </p>
            </h1>
            {Array.isArray(favorites) && favorites.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-7 justify-items-center sm:gap-8">
                {favorites.slice(0, 6).map((song, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={appearanceAnimation}
                  >
                    <SongCard
                      id={song.song.idApi}
                      title={song.song.title}
                      album={song.song.album}
                      artist={song.song.artist}
                      image={song.song.image}
                      url={song.song.url}
                      song={song.song}
                    />
                  </motion.div>
                ))}
                <MotionCard
                  isPressable
                  className="w-full m-2 col-span-2 sm:col-span-1"
                  shadow="sm"
                  onPress={() => {
                    router.push("/favorites");
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CardBody>
                    <div className="flex justify-center items-center h-full">
                      <h1 className="text-lg font-semibold">Ir a favoritos</h1>
                    </div>
                  </CardBody>
                </MotionCard>
              </div>
            ) : (
              <div className="py-6">
                <h1 className="text-base text-foreground/70">
                  Vaya, parece que no tienes canciones favoritas {":("}
                </h1>
              </div>
            )}
          </div>
          <div className="py-4 mb-10">
            <h1 className="text-2xl font-bold sm:text-3xl text-content1-foreground">
              Playlists
              <span className="font-extrabold ml-4">
                ( {playlists.length} )
              </span>
              <p className="mt-1.5 text-sm font-medium">
                Disfruta de tus listas de reproducción
              </p>
            </h1>
            {Array.isArray(playlists) && playlists.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-7 justify-items-center place-items-center sm:gap-8 mt-2">
                {playlists.slice(0, 6).map((playlist, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={appearanceAnimation}
                  >
                    <PlayListCard {...playlist} />
                  </motion.div>
                ))}
                <MotionCard
                  isPressable
                  className="w-full h-full m-2 col-span-2 sm:col-span-1"
                  shadow="sm"
                  onPress={() => {
                    router.push("/playlists");
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CardBody>
                    <div className="flex justify-center items-center h-full">
                      <h1 className="text-lg font-semibold">Ir a playlists</h1>
                    </div>
                  </CardBody>
                </MotionCard>
              </div>
            ) : (
              <div className="py-6">
                <h1 className="text-base text-foreground/70">
                  Vaya, parece que no tienes playlists creadas {":("}
                </h1>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full">
          <BentogridPlaylists />
        </div>
      )}
    </div>
  );
}
