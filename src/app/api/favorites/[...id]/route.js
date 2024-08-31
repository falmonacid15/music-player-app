import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    const song = await prisma.song.upsert({
      where: {
        idApi: data.idApi,
      },
      update: {},
      create: {
        idApi: data.idApi,
        title: data.title,
        artist: data.artist,
        album: data.album,
        url: data.url,
        image: data.image,
      },
    });

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId: parseInt(id[0]),
      },
    });

    const existingRelation = await prisma.songOnFavorite.findUnique({
      where: {
        songId_favoriteId: {
          songId: song.id,
          favoriteId: favorite.id,
        },
      },
    });

    if (!existingRelation) {
      await prisma.songOnFavorite.create({
        data: {
          songId: song.id,
          favoriteId: favorite.id,
        },
      });
    }

    return NextResponse.json(
      { message: "Agregada a favoritos exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Algo salio mal" }, { status: 400 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const favorites = await prisma.favorite.findUnique({
      where: {
        userId: parseInt(id[0]),
      },
      include: {
        songs: {
          include: { song: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Algo salio mal" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId: parseInt(id[0]),
      },
    });

    await prisma.songOnFavorite.delete({
      where: {
        songId_favoriteId: {
          songId: parseInt(id[1]),
          favoriteId: favorite.id,
        },
      },
    });

    const favorites = await prisma.favorite.findUnique({
      where: {
        userId: parseInt(id[0]),
      },
      include: {
        songs: {
          include: { song: true },
        },
      },
    });

    return NextResponse.json(
      { message: "Cancion eliminada de favoritos", favorites },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Algo salio mal" }, { status: 400 });
  }
}
