import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { unlink, writeFile } from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  signature_algorithm: "sha256",
});

export const uploadImage = async (file, folderPath) => {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);
  const filePath = path.join(process.cwd(), "public", file.name);
  await writeFile(filePath, buffer);

  const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
    folder: folderPath,
  });

  await unlink(filePath);

  return cloudinaryResult.secure_url;
};
