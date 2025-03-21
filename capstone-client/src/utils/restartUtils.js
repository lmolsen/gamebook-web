export default function handleRestart(
  setIsSolved,
  setIsSpelled,
  setIsDead,
  setSymbol,
  setWasHighlighted,
  setNoteHighlight,
  musicStop
) {
  setIsDead(false);
  setIsSolved(false);
  setSymbol(false);
  setNoteHighlight(false);
  setIsSpelled(false);
  setWasHighlighted(false);
  musicStop();
  const savedIsAudioOn = sessionStorage.getItem("isMusicOn");
  const savedIsFadeInOn = sessionStorage.getItem("isFadeInOn");
  sessionStorage.clear();
  sessionStorage.setItem("isMusicOn", savedIsAudioOn);
  sessionStorage.setItem("isFadeInOn", savedIsFadeInOn);
}
