import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { IoFolderOpen, IoHeart, IoHome, IoMenu } from "react-icons/io5";

const NavigationDropDown = () => {
  const router = useRouter();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <IoMenu className="text-2xl" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="home"
          onClick={() => {
            router.push("/");
          }}
          startContent={<IoHome className="text-xl" />}
        >
          Inicio
        </DropdownItem>
        <DropdownItem
          key="favorites"
          onClick={() => {
            router.push("/favorites");
          }}
          startContent={<IoHeart className="text-xl" />}
        >
          Favoritas
        </DropdownItem>
        <DropdownItem
          key="playlists"
          startContent={<IoFolderOpen className="text-xl" />}
        >
          Playlists
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavigationDropDown;
