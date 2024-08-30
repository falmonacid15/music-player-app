"use client";
import { useMusicAppStore } from "@/store/MusicAppStore";
import { useUserDataStore } from "@/store/UserDataStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { PiImageFill, PiXBold } from "react-icons/pi";

export default function CreatePlaylistModal({ isOpen, onOpenChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm();

  const { data: session } = useSession();

  const { setPlaylists } = useUserDataStore();
  const { selected } = useMusicAppStore();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("userId", session.user.id);

      let res;

      if (selected) {
        res = await axios.patch(`/api/playlists/${selected}`, formData);
      } else {
        res = await axios.post("/api/playlists", formData);
      }

      setPlaylists(res.data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const fetchSelectedPlaylist = async () => {
    try {
      const res = await axios.get(`/api/playlists/${selected}`);
      setValue("name", res.data.name);
      setValue("description", res.data.description);
    } catch (error) {
      console.error("Error fetching selected playlist:", error);
    }
  };

  useEffect(() => {
    if (selected) {
      fetchSelectedPlaylist();
    }
  }, [selected]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Nueva Playlist
            </ModalHeader>
            <ModalBody>
              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  variant="underlined"
                  label="Nombre"
                  placeholder="Ingrese nombre"
                  value={watch("name")}
                  {...register("name", { required: "El nombre es requerido" })}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
                <Textarea
                  variant="underlined"
                  label="Descripcion"
                  value={watch("description")}
                  placeholder="Ingrese descripcion"
                  {...register("description")}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  reset();
                }}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                variant="shadow"
                onPress={handleSubmit(onSubmit)}
              >
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
