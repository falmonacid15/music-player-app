"use client";

import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect } from "react";
import { IoPlay } from "react-icons/io5";

import { motion } from "framer-motion";
import { appearanceAnimation } from "@/constants/appearance-animation-config";
import { useUserDataStore } from "@/store/user-data-store";
import { useMusicAppStore } from "@/store/music-app-store";
import SongCard from "@/components/song-card/song-card";

function PlaylistWithId({ params }) {
  const {
    selectedPlaylist,
    setSelectedPlaylist,
    setSelectedPlaylistSongs,
    selectedPlaylistSongs,
  } = useUserDataStore();

  const { setSongsArray } = useMusicAppStore();

  const fetchSelectedPlaylist = async () => {
    try {
      const response = await axios.get(`/api/playlists/${params.id}`);
      setSelectedPlaylistSongs(response.data.songs);
      setSelectedPlaylist(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSelectedPlaylist();
    document.title = `MusicApp - ${selectedPlaylist.name}`;
  }, [params]);

  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold sm:text-3xl text-content1-foreground">
                {selectedPlaylist.name}
              </h1>
              <p className="mt-1.5 mb-4 text-sm">
                {selectedPlaylist.description}
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Button
                color="primary"
                variant="light"
                size="lg"
                onPress={() => {
                  const sanitizedPlaylist = selectedPlaylistSongs.map(
                    (playlistSong) => {
                      return playlistSong.song;
                    }
                  );
                  setSongsArray(sanitizedPlaylist);
                }}
                isIconOnly
                radius="full"
              >
                <IoPlay className="text-4xl ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {selectedPlaylistSongs.length > 0 ? (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-7 justify-items-center sm:gap-8">
          {selectedPlaylistSongs.map((playlistSong, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={appearanceAnimation}
            >
              <SongCard
                key={index}
                title={playlistSong.song.title}
                id={playlistSong.song.idApi}
                songId={playlistSong.song.id}
                playlistId={params.id}
                album={playlistSong.song.album}
                artist={playlistSong.song.artist}
                image={playlistSong.song.image}
                url={playlistSong.song.url}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <h1 className="text-2xl font-bold sm:text-3xl text-foreground/70">
            Aún no tienes canciones en esta playlist
          </h1>
          <p className="mt-1.5 text-sm text-foreground/70">
            Agrega canciones para comenzar a disfrutar de tu playlist
          </p>
        </div>
      )}
    </div>
  );
}

export default PlaylistWithId;
