import { Link, NavbarMenuItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBarReponsiveLinks({ pathName, label }) {
  const router = useRouter();
  const currentRoute = usePathname();

  return (
    <NavbarMenuItem key={pathName}>
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
    </NavbarMenuItem>
  );
}
