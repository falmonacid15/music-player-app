"use client";

import { Avatar, Button, Image, Input } from "@nextui-org/react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiImageFill, PiXBold } from "react-icons/pi";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, control } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (!isEditing) {
      setIsEditing(true);
      return;
    } else {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("fullName", data.name);
        formData.append("currentPassword", data.currentPassword);
        formData.append("newPassword", data.newPassword);
        formData.append("imageFile", data.image);

        const res = await axios.patch(
          `/api/auth/update-profile/${session.user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success(res.data.message);

        await signOut();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (session) {
      setValue("name", session.user.name);
      setCurrentImage(session.user.image);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold sm:text-3xl text-content1-foreground">
                  Configuracion de perfil
                </h1>
                <p className="mt-1.5 text-sm">
                  Actualiza tu informacion personal
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Button
                  color="primary"
                  variant="shadow"
                  type="submit"
                  isLoading={isLoading}
                >
                  {isEditing ? "Guardar" : "Editar"}
                </Button>
              </div>
            </div>
          </div>
        </header>
        <div className="flex justify-center mt-20">
          <div className="flex flex-col space-y-4 w-full sm:w-full md:w-full lg:w-1/3">
            <Input
              type="text"
              label="Nombre"
              placeholder="Nombre"
              variant="underlined"
              value={watch("name")}
              {...register("name")}
            />
            <Input
              type="password"
              label="Nueva contraseña"
              placeholder="Ingrese su nueva contraseña si desea cambiarla"
              variant="underlined"
              {...register("newPassword")}
            />
            <Input
              type="password"
              label="Contraseña actual"
              placeholder="Ingrese su contraseña actual para confirmar los cambios"
              variant="underlined"
              {...register("currentPassword")}
            />

            <div className="flex justify-start items-end gap-4">
              <div>
                <p className="text-xs font-light text-foreground mb-2">
                  Actualizar foto de perfil
                </p>
                <Avatar
                  className="w-28 h-28"
                  src={currentImage}
                  alt="Profile image"
                  radius="full"
                />
                <p className="text-sm text-content1-foreground mt-1 text-center">
                  Foto de perfil actual
                </p>
              </div>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="w-full mx-auto">
                    <div
                      className="border-b-2 border-content3 p-6 text-center cursor-pointer hover:border-content4 transition-colors"
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          onChange(file);
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                    >
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                      />
                      {value ? (
                        <div className="relative inline-block">
                          <img
                            src={URL.createObjectURL(value)}
                            alt="Preview"
                            className=" w-auto h-auto rounded-lg object-contain"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onChange(null);
                            }}
                            className="absolute top-2 right-2 bg-danger text-white p-1 rounded-full hover:bg-danger-500 transition-colors"
                            aria-label="Remove image"
                          >
                            <PiXBold className="w-4 h-4" />
                          </button>
                          <p className="mt-2 text-sm text-foreground/60">
                            {value.name} (
                            {(value.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                      ) : (
                        <div>
                          <PiImageFill
                            className="h-12 w-12 mx-auto text-foreground/60"
                            aria-hidden="true"
                          />
                          <p className="mt-2 text-sm text-foreground/60">
                            Arrastre y suelte una imagen aquí, o haga clic para
                            seleccionar un archivo
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
