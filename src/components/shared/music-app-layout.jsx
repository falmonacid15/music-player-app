"use client";

import MusicPlayer from "./music-player/music-player";
import NavbarApp from "./navbar/navbar-app";
import { ScrollShadow } from "@nextui-org/react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MusicAppLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen relative antialiased">
      <NavbarApp />
      <div className="flex-1 overflow-hidden  mb-20 ">
        <ToastContainer
          position="top-right"
          theme="colored"
          transition={Flip}
        />
        <ScrollShadow className="w-full h-full px-8 sm:px-8 ">
          {children}
        </ScrollShadow>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default MusicAppLayout;
