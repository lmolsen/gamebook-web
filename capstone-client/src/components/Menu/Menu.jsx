import "./Menu.scss"
import Hints from "./../Hints/Hints";
import Notes from "./../Notes/Notes";
import { useAudio } from "./../../utils/audioUtils";
import { useToggles } from "./../../utils/toggleUtils";
import { useTextSelection } from "./../../utils/puzzleUtils";
import { useNavigate } from "react-router-dom";



export default function Menu({isSolved, isSpelled, isDead}) {

    const navigate = useNavigate();

      const { volume, handleVolumeChange } = useAudio();
      
      const {
        isHintVisible,
        areNotesVisible,
        isAudioVisible,
        toggleHint,
        toggleNotes,
        toggleAudio,
      } = useToggles();
    
        const {
          hasTextBeenHighlighted,
        } = useTextSelection();
      
        const handleRestart = () => {
            navigate("/");
            window.location.reload();
          };

  return (
    <div className="toolbar">
      <div className="drawer">
        <div className="spacer"></div>
        <div className={`hint-drawer ${isHintVisible ? "visible" : "hidden"}`}>
          <Hints />
        </div>
        <div
          className={`notes-drawer ${areNotesVisible ? "visible" : "hidden"}`}
        >
          <Notes
            hasTextBeenHighlighted={hasTextBeenHighlighted}
            isSolved={isSolved}
            isSpelled={isSpelled}
          />
        </div>
        <div
          className={`audio-drawer ${isAudioVisible ? "visible" : "hidden"}`}
        >
          <label className="label" htmlFor="music">
            Music volume:
          </label>
          <input
            className="slider"
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

      <div className="blocks">
        <div
          className={`block restart ${
            isDead || location.pathname === "/wall-of-fame" ? "highlight" : ""
          }`}
          onClick={handleRestart}
        >
          Restart
        </div>
        <div className="block" onClick={toggleHint}>
          Hint
        </div>
        <div className="block " onClick={toggleNotes}>
          Notes
        </div>
        <div className="block " onClick={toggleAudio}>
          Audio
        </div>
      </div>
    </div>
  );
}
