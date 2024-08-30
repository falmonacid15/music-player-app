"use client";
import { Link, NavbarItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBarLinks({ pathName, label }) {
  const router = useRouter();
  const currentRoute = usePathname();

  return (
    <NavbarItem className="gap-4 sm:flex hidden" key={pathName}>
      <Link
        color="foreground"
        className="w-full"
        as="button"
        onClick={() => {
          router.push(pathName);
        }}
        underline={currentRoute === pathName ? "always" : "hover"}
      >
        {label}
      </Link>
    </NavbarItem>
  );
}
