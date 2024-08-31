import { Button, CardHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { IoHeart, IoTrash } from "react-icons/io5";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useUserDataStore } from "@/store/user-data-store";

export default function SongCardHeader({ playlistId, songId, song }) {
  const currentPath = usePathname();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const { setSelectedPlaylistSongs, handleClickFavorite } = useUserDataStore();

  const handleDeleteSongFromPlaylist = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `/api/playlists?playlist=${playlistId}&song=${songId}`,
        {}
      );
      setSelectedPlaylistSongs(res.data.songs);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardHeader className="absolute top-0 left-0 z-20 justify-end">
      {currentPath.startsWith("/playlists") ? (
        <Button
          variant="light"
          color="danger"
          radius="lg"
          size="md"
          isIconOnly
          isLoading={isLoading}
          onClick={() => {
            handleDeleteSongFromPlaylist();
          }}
        >
          <IoTrash className="text-xl" />
        </Button>
      ) : (
        <Button
          variant="light"
          color="danger"
          radius="lg"
          size="md"
          isIconOnly
          onClick={() => {
            handleClickFavorite(song, session.user.id);
          }}
        >
          <IoHeart className="text-lg" />
        </Button>
      )}
    </CardHeader>
  );
}
