import { useUserDataStore } from "@/store/user-data-store";
import { Button, Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

function SearchDropDownItem({ image, name, artists, album, idApi, url }) {
  const { favorites, handleClickFavorite } = useUserDataStore();

  const { data: session, status } = useSession();

  const song = {
    idApi,
    title: name,
    artist: artists,
    album,
    image,
    url,
  };

  return (
    <div className="h-[50px] w-[300px] flex gap-2 ml-2 mr-4 items-center">
      <div className="flex-shrink-0">
        <Image
          src={image}
          width={50}
          height={50}
          shadow="sm"
          alt={song.title}
        />
      </div>
      <div className="overflow-hidden flex-grow">
        <p className="text-sm font-semibold truncate whitespace-nowrap">
          {name}
        </p>
        <p className="text-xs text-gray-500 truncate whitespace-nowrap">
          {artists}
        </p>
        <p className="text-xs text-gray-500 truncate whitespace-nowrap">
          {album}
        </p>
      </div>
      <div className="flex-shrink-0 space-x-2">
        {status === "authenticated" && (
          <Button
            isIconOnly
            variant="light"
            onClick={() => {
              handleClickFavorite(song, session.user.id);
            }}
          >
            {favorites?.some((favorite) => favorite?.song?.idApi === idApi) ? (
              <IoHeartSharp className="text-xl " />
            ) : (
              <IoHeartOutline className="text-xl " />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchDropDownItem;
