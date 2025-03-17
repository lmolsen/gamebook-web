import { useState, useRef, useEffect } from 'react';

export const useAudio = () => {
  const [isAudioOn, setIsAudioOn] = useState(true); 
  const [volume, setVolume] = useState(50); 
const [musicFilePath, setMusicFilePath] = useState(
  "./src/assets/music/Video Dungeon Crawl.mp3"
);

  const audioRef = useRef(null);
  
  const musicPlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicFilePath);
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
    }
    // setTimeout(() => {
      audioRef.current.play();
    // }, 1000);
  };

  const musicStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isAudioOn) {
      musicStop();
      setIsAudioOn(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicFilePath);
        audioRef.current.loop = true;
        audioRef.current.volume = volume / 100;
      }
      musicPlay();
      setIsAudioOn(true);
    }
  };

    useEffect(() => {
      if (audioRef.current) {
        musicStop();
        musicPlay(); 
      }
    }, [musicFilePath]);

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
    musicStop,
    volume,
    handleVolumeChange,
    toggleMusic,
    musicPlay,
    isAudioOn,
    setMusicFilePath
  };
};

