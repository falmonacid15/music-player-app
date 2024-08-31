import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const playLists = await prisma.playList.findUnique({
      where: {
        id: parseInt(id[0]),
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

    return NextResponse.json(playLists);
  } catch (error) {}
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    const data = await request.formData();

    const name = data.get("name");
    const description = data.get("description");
    const image = data.get("image");
    const userId = data.get("userId");
    const song = data.get("song");

    const songJson = JSON.parse(song);

    let userPlaylists = [];

    if (song) {
      const findedSong = await prisma.song.upsert({
        where: {
          idApi: songJson.idApi,
        },
        update: {},
        create: {
          idApi: songJson.idApi,
          title: songJson.title,
          artist: songJson.artist,
          album: songJson.album,
          url: songJson.url,
          image: songJson.image,
        },
      });

      await prisma.playList.update({
        where: {
          id: parseInt(id[0]),
        },
        data: {
          songs: {
            create: {
              song: {
                connect: {
                  idApi: findedSong.idApi,
                },
              },
            },
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

      const findedPlaylists = await prisma.playList.findMany({
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

      userPlaylists = findedPlaylists.map((playlist) => {
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

      return NextResponse.json(userPlaylists, { status: 201 });
    }

    await prisma.playList.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        image,
      },
    });

    const findedPlaylists = await prisma.playList.findMany({
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

    userPlaylists = findedPlaylists.map((playlist) => {
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

    return NextResponse.json(userPlaylists, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.playList.delete({
      where: {
        id: parseInt(id[0]),
      },
    });

    const userPlaylists = await prisma.playList.findMany({
      where: {
        userId: parseInt(id[1]),
      },
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
    });

    const playlists = userPlaylists.map((playlist) => {
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
    return NextResponse.json({ message: "Algo salio mal" }, { status: 500 });
  }
}
