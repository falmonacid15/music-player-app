import { useMusicAppStore } from "@/store/MusicAppStore";
import { useUserDataStore } from "@/store/UserDataStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IoEllipsisVertical, IoPlay } from "react-icons/io5";

export default function PlayListCard({
  name,
  description,
  image,
  songs,
  images,
  id,
  onOpenChange,
}) {
  const router = useRouter();
  const pathName = usePathname();

  const onPlaylists = pathName === "/playlists";

  const isMobile = window.innerWidth < 768;

  const { data: session } = useSession();

  const { setSongsArray, setSelected } = useMusicAppStore();
  const { playlists, setPlaylists } = useUserDataStore();

  const handlePlay = () => {
    setSongsArray(songs);
  };

  const deletePlaylist = async () => {
    try {
      const res = await axios.delete(`/api/playlists/${id}/${session.user.id}`);
      setPlaylists(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setSelected(id);
    onOpenChange(true);
  };

  return (
    <Card
      className={`overflow-hidden ${
        isMobile
          ? onPlaylists
            ? "w-[400px] h-[400px]"
            : "w-[166px] h-[166px]"
          : onPlaylists
          ? "w-[400px] h-[400px]"
          : "w-[220px] h-[220px]"
      }`}
      isPressable
      onClick={() => {
        router.push(`/playlists/${id}`);
      }}
    >
      <CardBody className="p-0 overflow-hidden">
        {images ? (
          <div
            className={`grid ${
              images.length >= 4
                ? "grid-cols-2 grid-rows-2"
                : "place-items-center"
            } w-full h-full`}
          >
            {images.slice(0, 4).map((img, idx) => (
              <div key={idx} className="w-full h-full">
                <Image
                  src={img}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  radius="none"
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={image}
            width="100%"
            height="100%"
            objectFit="cover"
            radius="none"
          />
        )}
      </CardBody>
      <CardFooter className="min-h-16">
        <div className="flex justify-between w-full items-center">
          <div>
            <h1
              className="text-sm text-start font-bold text-content1-foreground truncate max-w-[120px]"
              title={name}
            >
              {name}
            </h1>
            <p className="text-start text-sm">{songs.length} canciones</p>
          </div>
          <div>
            <Button
              color="primary"
              variant="light"
              onClick={handlePlay}
              isIconOnly
            >
              <IoPlay className="text-xl" />
            </Button>
            {onPlaylists && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button variant="light" isIconOnly>
                    <IoEllipsisVertical className="text-xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit" onClick={handleEdit}>
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={deletePlaylist}
                  >
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
