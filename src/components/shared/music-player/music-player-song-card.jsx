import { useMusicAppStore } from "@/store/music-app-store";
import { useUserDataStore } from "@/store/user-data-store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoAddOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const MusicPlayerSongCard = ({ song }) => {
  const { data: session, status } = useSession();
  const { favorites, handleClickFavorite, playlists, setPlaylists } =
    useUserDataStore();
  const { currentPlaying } = useMusicAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickDefaultCreatePlaylist = async () => {
    try {
      const formData = new FormData();

      formData.append("userId", session?.user?.id);
      formData.append("song", JSON.stringify(song));

      const res = await axios.post("/api/playlists", formData);
      setPlaylists(res.data);
    } catch (error) {}
  };

  const handleClickOnPlaylist = async (playlistId) => {
    try {
      const formData = new FormData();

      formData.append("userId", session?.user?.id);
      formData.append("song", JSON.stringify(song));

      const res = await axios.patch(`/api/playlists/${playlistId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPlaylists(res.data);
    } catch (error) {}
  };

  return (
    <div className="w-[200px] h-[15px] sm:h-[50px] sm:w-[300px] flex mt-1 gap-2 ml-2 mr-4 items-center">
      <div className="flex-shrink-0">
        <Image
          src={song?.image || ""}
          width={50}
          height={50}
          shadow="sm"
          radius="md"
          className="hidden sm:hidden md:flex lg:flex"
        />
      </div>
      <div className="overflow-hidden flex-grow">
        <p className="text-xs sm:text-sm font-semibold truncate whitespace-nowrap">
          {song?.title || "No title"}
        </p>
        <p className="text-xs text-gray-500 truncate whitespace-nowrap font-medium">
          {song?.artist || "No artist"}
        </p>
        <p className="text-xs text-gray-500 truncate whitespace-nowrap">
          {song?.album || "No album"}
        </p>
      </div>
      {status === "unauthenticated" ? null : (
        <div className="flex-shrink-0 space-x-2">
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={() => {
              handleClickFavorite(song, session?.user?.id);
            }}
          >
            {isLoading ? (
              <Spinner size="sm" color="secondary" />
            ) : favorites?.some(
                (favorite) => favorite.song.idApi === currentPlaying?.idApi
              ) ? (
              <IoHeartSharp className="text-2xl mt-1 text-danger" />
            ) : (
              <IoHeartOutline className="text-2xl mt-1 text-danger" />
            )}
          </Button>
          <Dropdown placement="bottom-end" title="Add to playlist">
            <DropdownTrigger>
              <Button isIconOnly variant="light" radius="full">
                <IoAddOutline className="text-2xl text-success" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dynamic Actions"
              items={playlists || []}
              topContent={
                <div className="flex flex-col items-center p-2">
                  <div className="flex justify-around items-center space-x-2">
                    <h2 className="text-center text-sm font-bold ">
                      Agregar a playlist
                    </h2>
                    <Button
                      isIconOnly
                      variant="light"
                      radius="full"
                      size="sm"
                      color="success"
                      onClick={handleClickDefaultCreatePlaylist}
                    >
                      <IoAddOutline className="text-2xl text-success" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 text-center">
                      selecciona una playlist
                    </p>
                  </div>
                </div>
              }
              emptyContent={
                <div>
                  <h2>No tienes playlists</h2>
                </div>
              }
            >
              {(item) => (
                <DropdownItem
                  key={item.id}
                  onClick={() => {
                    handleClickOnPlaylist(item.id);
                  }}
                >
                  <div className="flex space-x-2">
                    <Image
                      src={item.image}
                      width={30}
                      height={30}
                      shadow="sm"
                      radius="full"
                    />
                    <div>
                      <p className="text-xs font-semibold">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.songs.length} canciones
                      </p>
                    </div>
                  </div>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default MusicPlayerSongCard;
