import { uploadImage } from "@/libs/cloudinary";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { create } from "zustand";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const user = searchParams.get("user");

    const findedPlaylists = await prisma.playList.findMany({
      where: {
        userId: parseInt(user),
      },
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
    });

    const playlists = findedPlaylists.map((playlist) => {
      return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        image: playlist.image,
        images: playlist.songs.map((song) => song.song.image),
        songs: playlist.songs.map((song) => {
          return {
            id: song.song.id,
            idApi: song.song.idApi,
            title: song.song.title,
            artist: song.song.artist,
            album: song.song.album,
            url: song.song.url,
            image: song.song.image,
          };
        }),
      };
    });

    return NextResponse.json(playlists, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();

    const name = data.get("name");
    const description = data.get("description");
    const userId = data.get("userId");
    const imageFile = data.get("imageFile");
    const song = data.get("song");

    let imageUrl = "";

    let userPlaylists = [];

    if (imageFile) {
      imageUrl = await uploadImage(imageFile, `music-app/playlists/${userId}`);
    }

    if (song) {
      const songFinded = await prisma.song.upsert({
        where: {
          idApi: song.idApi,
        },
        update: {},
        create: {
          idApi: song.idApi,
          title: song.title,
          artist: song.artist,
          album: song.album,
          url: song.url,
          image: song.image,
        },
      });

      await prisma.playList.create({
        data: {
          name: songFinded.title,
          userId,
          image: songFinded.image,
          songs: {
            create: song
              ? {
                  song: {
                    connect: {
                      idApi: songFinded.idApi,
                    },
                  },
                }
              : [],
          },
        },
        include: {
          songs: {
            include: {
              song: true,
            },
          },
        },
      });

      userPlaylists = await prisma.playList.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          songs: {
            include: {
              song: true,
            },
          },
        },
      });

      return NextResponse.json(userPlaylists, { status: 201 });
    }

    await prisma.playList.create({
      data: {
        name,
        description,
        userId: parseInt(userId),
        image: imageUrl,
      },
    });

    userPlaylists = await prisma.playList.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
    });

    return NextResponse.json(userPlaylists, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const playlist = searchParams.get("playlist");
    const song = searchParams.get("song");

    console.log(playlist, song);

    const findedPlaylist = await prisma.playList.findUnique({
      where: {
        id: parseInt(playlist),
      },
    });

    if (!findedPlaylist) {
      return NextResponse.json(
        { message: "Playlist not found" },
        { status: 404 }
      );
    }

    const deleteSong = await prisma.songOnPlaylist.delete({
      where: {
        songId_playlistId: {
          songId: parseInt(song),
          playlistId: parseInt(playlist),
        },
      },
    });

    const userPlaylist = await prisma.playList.findUnique({
      where: {
        id: parseInt(playlist),
      },
      include: {
        songs: {
          include: {
            song: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(userPlaylist, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
