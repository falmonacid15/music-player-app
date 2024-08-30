"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res.ok) {
        router.push("/");
        toast.success("Sesion iniciada correctamente");
      } else {
        toast.error(res.error);
        setError("email", {
          type: "manual",
          message: "",
        });
        setError("password", {
          type: "manual",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center">
      <div className="flex flex-col items-center mt-20 mb-8">
        <h1 className="text-4xl font-bold">Iniciar sesion</h1>
        <p className="text-gray-500">Ingrese sus credenciales</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full sm:full md:1/3 lg:w-1/2"
      >
        <Input
          type="email"
          variant="underlined"
          label="Correo Electronico"
          placeholder="Ingrese su correo"
          {...register("email", {
            required: { value: true, message: "Este campo es requerido" },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Correo electronico invalido",
            },
          })}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          autoComplete="email"
        />
        <Input
          type="password"
          variant="underlined"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          {...register("password", {
            required: { value: true, message: "Este campo es requerido" },
          })}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="shadow"
            color="primary"
            isLoading={isLoading}
          >
            Iniciar sesion
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center mt-6">
        <p className="text-gray-500">¿No tienes una cuenta?</p>
        <Link
          className="text-sm"
          as="button"
          onClick={() => {
            router.push("/auth/register");
          }}
        >
          Registrate
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
