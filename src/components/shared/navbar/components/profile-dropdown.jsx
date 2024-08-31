import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { IoLogOut, IoSettings } from "react-icons/io5";
import ThemeSwitch from "./theme-switch";
import { useUserDataStore } from "@/store/user-data-store";

const ProfileDropdown = ({ user }) => {
  const { setFavorites, setPlaylists } = useUserDataStore();
  const router = useRouter();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          name={user.name}
          size="sm"
          src={user.image}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        topContent={
          <div className="flex space-x-2 items-center">
            <Avatar
              size="md"
              src={user.image}
              name={user.name}
              title={user.name}
              alt="user avatar"
            />
            <div className="">
              <h2 className="text-sm font-bold ">{user.name}</h2>
              <p className="text-sm font-light max-w-48 truncate">
                {user.email}
              </p>
            </div>
            <div className="flex sm:flex md:hidden lg:hidden">
              <ThemeSwitch />
            </div>
          </div>
        }
      >
        <DropdownItem
          key="settings"
          onClick={() => {
            router.push("/profile-settings");
          }}
          startContent={<IoSettings className="text-xl" />}
        >
          Configuracion
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => {
            signOut();
            setFavorites([]);
            setPlaylists([]);
          }}
          startContent={<IoLogOut className="text-xl" />}
        >
          Cerrar sesion
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
