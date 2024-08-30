import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { uploadImage } from "@/libs/cloudinary";

export async function POST(request) {
  try {
    const data = await request.formData();

    const fullName = data.get("fullName");
    const email = data.get("email");
    const password = data.get("password");
    const image = data.get("imageFile");

    let imageUrl = "";

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "Este usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (image) {
      imageUrl = await uploadImage(image, "music-app/users");
    }

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    await prisma.favorite.create({
      data: {
        user: { connect: { id: newUser.id } },
      },
    });

    return NextResponse.json({ message: "Registro exitoso" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Algo salio mal" }, { status: 500 });
  }
}
