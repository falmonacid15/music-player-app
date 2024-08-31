import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { useSession } from "next-auth/react";
import ProfileDropdown from "./components/profile-dropdown";
import ThemeSwitch from "./components/theme-switch";
import NavBarLinks from "./components/navbar-links";
import { useState } from "react";
import NavBarReponsiveLinks from "./components/navbar-responsive-links";
import AuthButtons from "./components/auth-buttons";
import SongSearch from "./components/song-search-input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { appearanceAnimation } from "@/constants/appearance-animation-config";

const NavbarApp = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      pathName: "/",
      label: "Inicio",
    },
    {
      pathName: "/favorites",
      label: "Favoritas",
    },
    {
      pathName: "/playlists",
      label: "Playlists",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarItem className="mr-8 hidden sm:hidden md:flex lg:flex">
          <Link
            as="button"
            onClick={() => router.push("/")}
            color="foreground"
            className="text-lg font-semibold"
          >
            MusicApp
          </Link>
        </NavbarItem>
        {status === "authenticated" && (
          <>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={appearanceAnimation}
              >
                <NavBarLinks
                  key={index}
                  pathName={item.pathName}
                  label={item.label}
                />
              </motion.div>
            ))}
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem className="flex w-full sm:hidden">
          <SongSearch />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="sm:flex hidden">
          <SongSearch />
        </NavbarItem>
        {status === "unauthenticated" ? (
          <AuthButtons />
        ) : (
          <ProfileDropdown user={session?.user} />
        )}
        <div className="hidden sm:hidden md:flex lg:flex">
          <ThemeSwitch />
        </div>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavBarReponsiveLinks
            key={index}
            pathName={item.pathName}
            label={item.label}
          />
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarApp;
