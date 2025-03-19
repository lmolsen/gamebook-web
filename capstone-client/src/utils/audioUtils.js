import { useState, useRef, useEffect } from "react";
import mainSong from "../assets/music/Video Dungeon Crawl.mp3";

export const useAudio = () => {
  const [isAudioOn, setIsAudioOn] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAudioOn")) ?? true;
  });
  const [volume, setVolume] = useState(() => {
    return JSON.parse(sessionStorage.getItem("volume")) ?? 50;
  });
  const [musicFilePath, setMusicFilePath] = useState(mainSong);

  const audioRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("isAudioOn", JSON.stringify(isAudioOn));
  }, [isAudioOn]);

  useEffect(() => {
    sessionStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      musicStop();
      musicPlay();
    }
  }, [musicFilePath]);

  const musicPlay = () => {
    if (isAudioOn) {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicFilePath);
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;
      }
      audioRef.current.play();
      setIsAudioOn(true);
    }
  };

  const musicStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      // setIsAudioOn(true);
    }
  };

  const musicPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsAudioOn(false);
    }
  };

  const toggleMusic = () => {
    if (isAudioOn) {
      musicPause();
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicFilePath);
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;
        audioRef.current.play();
      } else {
        audioRef.current.play();
      }
      setIsAudioOn(true);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return {
    audioRef,
    musicPlay,
    musicStop,
    volume,
    handleVolumeChange,
    toggleMusic,
    musicPlay,
    isAudioOn,
    setMusicFilePath,
    musicPause,
  };
};
