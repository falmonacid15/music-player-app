"use client";
import { Button, useDisclosure } from "@nextui-org/react";

import PlayListCard from "./components/playlist-card";
import { PiFolderPlusFill } from "react-icons/pi";
import CreatePlaylistModal from "@/components/create-playlist-modal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { appearanceAnimation } from "@/constants/appearance-animation-config";
import { useUserDataStore } from "@/store/user-data-store";
import { useMusicAppStore } from "@/store/music-app-store";

export default function PlaylistsPage() {
  const playlistModal = useDisclosure();
  const { setPlaylists, playlists } = useUserDataStore();
  const { setSelected, selected } = useMusicAppStore();

  const { data: session } = useSession();

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get(`/api/playlists?user=${session.user.id}`);
      setPlaylists(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (session) {
      fetchPlaylists();
    }
    document.title = "MusicApp - Playlists";
  }, []);

  useEffect(() => {
    if (!playlistModal.isOpen && selected) {
      setSelected(null);
    }
  }, [playlistModal.isOpen]);

  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl text-content1-foreground">
                Playlists
              </h1>
              <p className="mt-1.5 mb-4 text-sm">
                Disfruta de tus listas de reproducción
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Button
                color="primary"
                variant="light"
                size="md"
                onPress={() => {
                  playlistModal.onOpenChange(true);
                }}
                startContent={<PiFolderPlusFill className="text-xl" />}
              >
                Crear nueva
              </Button>
            </div>
          </div>
        </div>
      </header>
      <CreatePlaylistModal {...playlistModal} />
      <div>
        {playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 space-y-12 place-items-end justify-items-center py-8">
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={appearanceAnimation}
              >
                <PlayListCard
                  {...playlist}
                  onOpenChange={playlistModal.onOpenChange}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh]">
            <h1 className="text-2xl font-bold sm:text-3xl text-foreground/70">
              Aún no tienes listas de reproducción
            </h1>
            <p className="mt-1.5 text-sm text-foreground/70">
              Crea tus listas de reproducción y disfruta de tu música favorita
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
