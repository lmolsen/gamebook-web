import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import TitlePage from "./pages/TitlePage/TitlePage";
import PageLayout from "./components/PageLayout/PageLayout";
import WallOfFame from "./pages/WallOfFame/WallOfFame";
import Hints from "./components/Hints/Hints";
import Notes from "./components/Notes/Notes";
import TextToSpeech from "./components/TextToSpeech/TextToSpeech";

import { useAudio } from "./utils/audioUtils";
import { useToggles } from "./utils/toggleUtils";
import { useTextSelection } from "./utils/puzzleUtils";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTitlePage = location.pathname === "/";
  const [isSolved, setIsSolved] = useState(false);

  // util hooks
  const { musicPlay, volume, handleVolumeChange } = useAudio();
  const {
    isHintVisible,
    areNotesVisible,
    isAudioVisible,
    toggleHint,
    toggleNotes,
    toggleAudio,
  } = useToggles();

  const {
    isTextSelected,
    hasTextBeenHighlighted,
    handleTextSelection,
    setIsTextSelected,
    setHasTextBeenHighlighted,
  } = useTextSelection();

  const [isDead, setIsDead] = useState(false);

  const handleRestart = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="screen">
        <main className="main">
          <div className="torch left"></div>
          {!isTitlePage && <TextToSpeech />}
          <Routes>
            <Route path="/" element={<TitlePage musicPlay={musicPlay} />} />
            <Route
              path="/:pageId"
              element={
                <PageLayout
                isDead={isDead}
                  setIsDead={setIsDead}
                  setIsSolved={setIsSolved}
                  isSolved={isSolved}
                  hasTextBeenHighlighted={hasTextBeenHighlighted}
                  setIsTextSelected={setIsTextSelected}
                  setHasTextBeenHighlighted={setHasTextBeenHighlighted}
                />
              }
            />
            <Route path="/wall-of-fame" element={<WallOfFame />} />
          </Routes>
          <div className="torch right"></div>
        </main>
        {!isTitlePage && (
          <div className="toolbar">
            <div className="drawer">
              <div className="spacer"></div>
              <div
                className={`hint-drawer ${
                  isHintVisible ? "visible" : "hidden"
                }`}
              >
                <Hints />
              </div>
              <div
                className={`notes-drawer ${
                  areNotesVisible ? "visible" : "hidden"
                }`}
              >
                <Notes
                  hasTextBeenHighlighted={hasTextBeenHighlighted}
                  isSolved={isSolved}
                />
              </div>
              <div
                className={`audio-drawer ${
                  isAudioVisible ? "visible" : "hidden"
                }`}
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
                className={`block restart ${isDead ? "highlight" : ""}`}
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
        )}
      </div>
    </>
  );
}

export default App;
