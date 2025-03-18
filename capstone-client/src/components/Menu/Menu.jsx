import "./Menu.scss";
import Hints from "./../Hints/Hints";
import Notes from "./../Notes/Notes";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu({
  isSolved,
  isSpelled,
  isDead,
  wasHighlighted,
  volume,
  handleVolumeChange
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isHintVisible, setIsHintVisible] = useState(false);
  const [areNotesVisible, setAreNotesVisible] = useState(false);
  const [isAudioVisible, setIsAudioVisible] = useState(false);
  const [noteHighlight, setNoteHighlight]= useState(false);

  const toggleHint = () => setIsHintVisible((prev) => !prev);
  const toggleNotes = () => 
    { 
      setAreNotesVisible((prev) => !prev);
         setNoteHighlight(false);
    }
  const toggleAudio = () => setIsAudioVisible((prev) => !prev);

  const handleRestart = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (isSolved || isSpelled || wasHighlighted) {
        setNoteHighlight(true);
    }
  }, [isSolved, isSpelled, wasHighlighted]);

  // useEffect(()=> {
  //        setNoteHighlight(false);
  // }, [location])

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
            className="menu__slider"
            id="music"
            name="music"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <div className="menu__blocks">
        <div
          className={`menu__block menu__block--restart ${
            isDead || location.pathname === "/wall-of-fame" ? "highlight" : ""
          }`}
          onClick={handleRestart}
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
