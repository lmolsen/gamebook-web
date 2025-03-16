import { useState } from 'react';

export const useTextSelection = () => {
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [hasTextBeenHighlighted, setHasTextBeenHighlighted] = useState(false);

  const handleTextSelection = (isSelected) => {
    if (isSelected && !hasTextBeenHighlighted) {
      setHasTextBeenHighlighted(true);
    }
    setIsTextSelected(isSelected);
  };

  return {
    handleTextSelection,
    isTextSelected,
    setIsTextSelected, 
    hasTextBeenHighlighted,
    setHasTextBeenHighlighted
  };
};
