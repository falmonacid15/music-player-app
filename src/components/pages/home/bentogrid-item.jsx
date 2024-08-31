import { useMusicAppStore } from "@/store/music-app-store";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { IoPause, IoPlay } from "react-icons/io5";

export default function BentoGridItem({ name, description, image, songs }) {
  const { setSongsArray, currentPlaying, setIsPlaying, isPlaying } =
    useMusicAppStore();

  const handlePlay = () => {
    setSongsArray(songs);
    setIsPlaying(true);
  };

  const isPlayingSongFromThisPlaylist = songs.some(
    (song) => song.idApi === currentPlaying?.idApi
  );

  return (
    <Card
      className="w-full h-[300px] relative"
      isPressable
      onPress={() => {
        handlePlay();
      }}
      isBlurred
    >
      <CardHeader className="absolute z-10 top-0 flex-col !items-start bg-content2/45">
        <p className="text-lg text-foreground uppercase font-extrabold">
          {name}
        </p>
        <h4 className="text-foreground font-medium text-sm text-start">
          {description}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={image}
      />
      <div className="absolute inset-0 flex justify-center items-center z-20">
        {isPlayingSongFromThisPlaylist && isPlaying ? (
          <IoPause className="text-white text-4xl" />
        ) : (
          <IoPlay className="text-white text-4xl" />
        )}
      </div>
    </Card>
  );
}
