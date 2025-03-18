import "./Menu.scss";
import Hints from "./../Hints/Hints";
import Notes from "./../Notes/Notes";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import handleRestart from "./../../utils/restartUtils";
import audioOn from "./../../assets/icons/audio-on.png";
import audioOff from "./../../assets/icons/audio-off.png";

export default function Menu({
  isSolved,
  setIsSolved,
  isSpelled,
  setIsSpelled,
  isDead,
  setIsDead,
  symbol,
  setSymbol,
  wasHighlighted,
  setWasHighlighted,
  isAudioOn,
  volume,
  handleVolumeChange,
  musicStop,
  toggleMusic
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isHintVisible, setIsHintVisible] = useState(false);
  const [areNotesVisible, setAreNotesVisible] = useState(false);
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [noteHighlight, setNoteHighlight] = useState(false);

  const toggleHint = () => setIsHintVisible((prev) => !prev);
  const toggleNotes = () => {
    setAreNotesVisible((prev) => !prev);
    setNoteHighlight(false);
  };
  const toggleAudio = () => setIsAudioVisible((prev) => !prev);

  const restartGame = () => {
    handleRestart(
      setIsSolved,
      setIsSpelled,
      setIsDead,
      setSymbol,
      setWasHighlighted,
      setNoteHighlight,
      musicStop
    );
    navigate("/");
  };

  useEffect(() => {
    if (isSolved || isSpelled || wasHighlighted) {
      setNoteHighlight(true);
    }
  }, [isSolved, isSpelled, wasHighlighted]);

  useEffect(() => {
    console.log(symbol);
    if (symbol === "heart" || symbol === "treasure" || symbol === "skull") {
      setNoteHighlight(false);
    }
  }, [symbol, location]);

  return (
    <div className="menu">
      <div className="menu__drawers">
        <div className="menu__spacer"></div>
        <div
          className={`menu__drawer menu__drawer--hints ${
            isHintVisible ? "visible" : "hidden"
          }`}
        >
          <Hints />
        </div>
        <div
          className={`menu__drawer menu__drawer--notes ${
            areNotesVisible ? "visible" : "hidden"
          }`}
        >
          <Notes
            wasHighlighted={wasHighlighted}
            isSolved={isSolved}
            isSpelled={isSpelled}
          />
        </div>
        <div
          className={`menu__drawer menu__drawer--audio ${
            isAudioVisible ? "visible" : "hidden"
          }`}
        >
          <label className="menu__label" htmlFor="music">
            Music volume:
          </label>
     
            <input
              className="menu__volume"
              id="music"
              name="music"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
           <button className="menu__audio" onClick={toggleMusic}>
                <img
                  className="menu__icon"
                  src={isAudioOn ? audioOn : audioOff}
                  alt="Audio icon"
                />
              </button>
        </div>
      </div>

      <div className="menu__blocks">
        <div
          className={`menu__block menu__block--restart ${
            isDead || location.pathname === "/wall-of-fame" ? "highlight" : ""
          }`}
          onClick={restartGame}
        >
          Restart
        </div>
        <div className="menu__block menu__block--hints" onClick={toggleHint}>
          Hint
        </div>
        <div
          className={`menu__block menu__block--notes ${
            noteHighlight ? "highlight" : ""
          }`}
          onClick={toggleNotes}
        >
          Notes
        </div>
        <div className="menu__block menu__block--audio" onClick={toggleAudio}>
          Audio
        </div>
      </div>
    </div>
  );
}
