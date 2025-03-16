import "./Menu.scss";
import Hints from "./../Hints/Hints";
import Notes from "./../Notes/Notes";
import { useAudio } from "./../../utils/audioUtils";
import { useToggles } from "./../../utils/toggleUtils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({
  isSolved,
  isSpelled,
  isDead,
  wasHighlighted,
}) {
  const navigate = useNavigate();

  const { musicPlay, volume, handleVolumeChange } = useAudio();

  useEffect(() => {
    musicPlay();
  }, []);

  const {
    isHintVisible,
    areNotesVisible,
    isAudioVisible,
    toggleHint,
    toggleNotes,
    toggleAudio,
  } = useToggles();

  const handleRestart = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="menu">
      <div className="menu__drawers">
        <div className="menu__spacer"></div>
        <div
          className={`menu__hint-drawer ${
            isHintVisible ? "visible" : "hidden"
          }`}
        >
          <Hints />
        </div>
        <div
          className={`menu__notes-drawer ${
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
          className={`menu__audio-drawer ${
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
          className={`menu__block restart ${
            isDead || location.pathname === "/wall-of-fame" ? "highlight" : ""
          }`}
          onClick={handleRestart}
        >
          Restart
        </div>
        <div className="menu__block" onClick={toggleHint}>
          Hint
        </div>
        <div className="menu__block " onClick={toggleNotes}>
          Notes
        </div>
        <div className="menu__block " onClick={toggleAudio}>
          Audio
        </div>
      </div>
    </div>
  );
}
