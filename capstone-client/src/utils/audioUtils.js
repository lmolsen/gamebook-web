import { useState, useRef, useEffect } from 'react';

export const useAudio = () => {
  const [isAudioOn, setIsAudioOn] = useState(true); 
  const [volume, setVolume] = useState(50); 

  const audioRef = useRef(null);
  
  const musicPlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("./src/assets/music/fantasy-placeholder.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
    }
    audioRef.current.play();
  };

  const musicStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleMusic = () => {
    if (isAudioOn) {
      musicStop();
      setIsAudioOn(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio("./src/assets/music/fantasy-placeholder.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;
      }
      musicPlay();
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
    musicPlay,
    volume,
    handleVolumeChange,
    toggleMusic,
    musicPlay,
    isAudioOn
  };
};

