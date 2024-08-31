import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { uploadImage } from "@/libs/cloudinary";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    const data = await request.formData();

    const fullName = data.get("fullName");
    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("newPassword");
    const imageFile = data.get("image");

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    if (currentPassword && newPassword) {
      const isPasswordValid = bcrypt.compareSync(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "La contraseña actual es incorrecta" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    if (fullName) {
      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          fullName,
        },
      });
    }

    if (imageFile) {
      const imageUrl = await uploadImage(imageFile, `music-app/users`);

      await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          image: imageUrl,
        },
      });
    }

    return NextResponse.json(
      { message: "Cuenta actualizada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Algo salio mal" }, { status: 500 });
  }
}
