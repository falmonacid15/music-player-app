import { useUserDataStore } from "@/store/UserDataStore";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadCrumbsCustom() {
  const currentPath = usePathname();
  const { selectedPlaylist } = useUserDataStore();

  const routes = [
    { name: "Inicio", href: "/" },
    { name: "Favoritas", href: "/favorites" },
    { name: "Playlists", href: "/playlists" },
  ];

  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
      <BreadcrumbItem href="/favorites">Favoritas</BreadcrumbItem>
      <BreadcrumbItem href="/playlists">Playlists</BreadcrumbItem>
      <BreadcrumbItem href={`/playlists/${selectedPlaylist.id}`}>
        {selectedPlaylist.name}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
