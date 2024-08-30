import { Link, NavbarItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React from "react";
import { IoLogIn } from "react-icons/io5";

const AuthButtons = () => {
  const router = useRouter();

  return (
    <>
      <NavbarItem
        className="cursor-pointer"
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        <IoLogIn className="text-3xl text-primary" />
      </NavbarItem>
    </>
  );
};

export default AuthButtons;
