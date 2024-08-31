import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import { Providers } from "./providers";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import MusicAppLayout from "@/components/shared/music-app-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MusicApp",
  description:
    "Aplicacion capaz de reproducir musica y buscar canciones por nombre, artista o album.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers session={session}>
          <MusicAppLayout>{children}</MusicAppLayout>
        </Providers>
      </body>
    </html>
  );
}
