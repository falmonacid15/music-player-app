"use client";

import { Button, Input, Link } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiImageFill, PiXBold } from "react-icons/pi";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.image) {
        formData.append("imageFile", data.image);
      }

      const res = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);

      router.push("/auth/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col  w-full items-center py-8">
      <div className="flex flex-col items-center mt-20 mb-8">
        <h1 className="text-4xl font-bold">Crear nueva cuenta</h1>
        <p className="text-gray-500">Ingrese sus credenciales</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full sm:full md:1/3 lg:w-1/2"
      >
        <Input
          isRequired
          type="text"
          variant="underlined"
          label="Nombre"
          placeholder="Ingrese su nombre"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        />
        <Input
          isRequired
          type="email"
          variant="underlined"
          label="Correo Electronico"
          placeholder="Ingrese su correo"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Ingrese un correo valido",
            },
          })}
        />
        <Input
          isRequired
          type="password"
          variant="underlined"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        <div className="w-full flex flex-col">
          <label className="text-sm text-foreground/60">Imagen de perfil</label>
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
                  onClick={() => document.getElementById("fileInput")?.click()}
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
                        {value.name} ({(value.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
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

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            variant="shadow"
            color="primary"
            isLoading={isLoading}
          >
            Crear cuenta
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center mt-6">
        <p className="text-gray-500">¿Ya tienes una cuenta?</p>
        <Link
          className="text-sm"
          as="button"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Inicia sesion aquí
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
