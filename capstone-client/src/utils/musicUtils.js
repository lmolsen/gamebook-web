import { useState, useRef, useEffect } from "react";
import mainSong from "../assets/music/Video Dungeon Crawl.mp3";

export const useMusic = () => {
  const [isMusicOn, setIsMusicOn] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isMusicOn")) ?? true;
  });
  const [volume, setVolume] = useState(() => {
    return JSON.parse(sessionStorage.getItem("volume")) ?? 50;
  });
  const [musicFilePath, setMusicFilePath] = useState(mainSong);

  const musicRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("isMusicOn", JSON.stringify(isMusicOn));
  }, [isMusicOn]);

  useEffect(() => {
    sessionStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    if (musicRef.current) {
      musicStop();
      musicPlay();
    }
  }, [musicFilePath]);

  const musicPlay = () => {
    if (isMusicOn) {
      if (!musicRef.current) {
        musicRef.current = new Audio(musicFilePath);
        musicRef.current.loop = true;
        musicRef.current.volume = volume / 100;
      }
      musicRef.current.play();
      setIsMusicOn(true);
    }
  };

  const musicStop = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current = null;
    }
  };

  const musicPause = () => {
    if (musicRef.current) {
      musicRef.current.pause();
      setIsMusicOn(false);
    }
  };

  const toggleMusic = () => {
    if (isMusicOn) {
      musicPause();
    } else {
      if (!musicRef.current) {
        musicRef.current = new Audio(musicFilePath);
        musicRef.current.loop = true;
        musicRef.current.volume = volume / 100;
        musicRef.current.play();
      } else {
        musicRef.current.play();
      }
      setIsMusicOn(true);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (musicRef.current) {
      musicRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = volume / 100;
    }
  }, [volume]);

  return {
    musicRef,
    musicPlay,
    musicStop,
    volume,
    handleVolumeChange,
    toggleMusic,
    isMusicOn,
    setMusicFilePath,
    musicPause,
  };
};
