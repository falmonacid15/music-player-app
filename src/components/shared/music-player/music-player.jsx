"use client";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MusicPlayerSongCard from "./music-player-song-card";
import {
  IoPauseCircle,
  IoPlayBack,
  IoPlayCircle,
  IoPlayForward,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { useMusicAppStore } from "@/store/music-app-store";

const MusicPlayer = () => {
  const { currentPlaying, songsArray, setIsPlaying, isPlaying } =
    useMusicAppStore();
  const [songUrl, setSongUrl] = useState("");

  const isSmallDevice =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (currentPlaying) {
      setSongUrl(currentPlaying.url);
    }
  }, [currentPlaying]);

  useEffect(() => {
    if (songsArray.length === 0) {
      useMusicAppStore.setState({ currentPlaying: null });
    } else {
      useMusicAppStore.setState({ currentPlaying: songsArray[0] });
    }
  }, [songsArray]);

  const handleNext = () => {
    if (songsArray.length === 0) return;
    const currentIndex = songsArray.findIndex(
      (song) => song.idApi === currentPlaying.idApi
    );
    if (currentIndex + 1 < songsArray.length) {
      useMusicAppStore.setState({
        currentPlaying: songsArray[currentIndex + 1],
      });
    }
  };

  const handlePrevious = () => {
    if (songsArray.length === 0) return;
    const currentIndex = songsArray.findIndex(
      (song) => song.idApi === currentPlaying.idApi
    );
    if (currentIndex - 1 >= 0) {
      useMusicAppStore.setState({
        currentPlaying: songsArray[currentIndex - 1],
      });
    }
  };

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    setIsPlaying(false);
  };

  return (
    <AudioPlayer
      src={songUrl}
      layout={isSmallDevice ? "stacked" : "horizontal"}
      showSkipControls={true}
      showJumpControls={isSmallDevice ? false : true}
      onClickNext={handleNext}
      onClickPrevious={handlePrevious}
      onPlay={onPlay}
      onPause={onPause}
      customControlsSection={[
        <div className={!currentPlaying ? "opacity-0" : ""}>
          <MusicPlayerSongCard song={currentPlaying} />
        </div>,
        // RHAP_UI.ADDITIONAL_CONTROLS,
        RHAP_UI.MAIN_CONTROLS,
        isSmallDevice ? null : RHAP_UI.VOLUME_CONTROLS,
      ]}
      customIcons={{
        pause: <IoPauseCircle className="text-primary" />,
        play: <IoPlayCircle className="text-primary" />,
        forward: <IoPlayForward className="text-content3-foreground" />,
        rewind: <IoPlayBack className="text-content3-foreground" />,
        next: <IoPlaySkipForward className="text-content3-foreground" />,
        previous: <IoPlaySkipBack className="text-content3-foreground" />,
      }}
      className="border-t-2 border-content3-foreground/10"
    />
  );
};

export default MusicPlayer;
