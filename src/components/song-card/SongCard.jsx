import { useMusicAppStore } from "@/store/MusicAppStore";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

import React from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import SongCardHeader from "./components/song-card-header";

const SongCard = ({
  id,
  title,
  album,
  artist,
  image,
  url,
  playlistId,
  songId,
  song,
}) => {
  const { currentPlaying, setCurrentPlaying } = useMusicAppStore();

  return (
    <Card
      radius="lg"
      className="border-none w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] m-2 col-span-1 relative"
      isFooterBlurred
    >
      <SongCardHeader playlistId={playlistId} songId={songId} song={song} />
      <Image
        alt="Woman listening to music"
        className="object-cover"
        height={200}
        src={image}
        width={200}
        isZoomed
      />
      <CardFooter className="bg-content3/45 border-white/5 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="flex flex-col overflow-hidden w-[200px]">
          <p className="text-sm text-content2-foreground text-left font-bold truncate">
            {title}
          </p>
          <p className="text-tiny text-content2-foreground truncate">
            {artist}
          </p>
          <p className="text-tiny text-content2-foreground truncate">{album}</p>
        </div>
        <Button
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          isIconOnly
          onClick={() => {
            setCurrentPlaying({
              idApi: id,
              title,
              artist,
              album,
              image,
              url,
            });
          }}
        >
          {currentPlaying?.idApi === id ? (
            <IoPause className="text-lg opacity-70" />
          ) : (
            <IoPlay className="text-lg opacity-70" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SongCard;
