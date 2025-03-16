import { useState } from 'react';

export const useToggles = () => {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [areNotesVisible, setAreNotesVisible] = useState(false);
  const [isAudioVisible, setIsAudioVisible] = useState(false);

  const toggleHint = () => setIsHintVisible(prev => !prev);
  const toggleNotes = () => setAreNotesVisible(prev => !prev);
  const toggleAudio = () => setIsAudioVisible(prev => !prev);

  return {
    isHintVisible,
    areNotesVisible,
    isAudioVisible,
    toggleHint,
    toggleNotes,
    toggleAudio,
  };
};
