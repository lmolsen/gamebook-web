import { useState, useRef, useEffect } from 'react';

export const useAudio = () => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(50);

  const musicPlay = () => {
    const audio = new Audio("./src/assets/music/fantasy-placeholder.mp3");
    audio.loop = true;
    audioRef.current = audio;
    audio.volume = volume / 100;
    audio.play();
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
    musicPlay,
    volume,
    handleVolumeChange,
  };
};
