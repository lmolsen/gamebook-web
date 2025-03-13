import './App.scss'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TitlePage from './pages/TitlePage/TitlePage';
import Hints from './components/Hints/Hints';
import Notes from './components/Notes/Notes';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const audioRef = useRef(null);

  const [isDead, setIsDead] = useState(false);
  const isTitlePage = location.pathname === "/";

  const [volume, setVolume] = useState(50);

  const [_isTextSelected, setIsTextSelected] = useState(false);
  const [hasTextBeenHighlighted, setHasTextBeenHighlighted] = useState(false);

  const [isHintVisible, setIsHintVisible] = useState(false);
  const [areNotesVisible, setAreNotesVisible] = useState(false);
  const [isAudioVisible, setIsAudioVisible] = useState(false);

  const toggleHint = () => {
    setIsHintVisible((prev) => !prev);
  };

  const toggleNotes = () => {
    setAreNotesVisible((prev) => !prev);
  };

  const toggleAudio = () => {
    setIsAudioVisible((prev) => !prev);
  };

  const handleRestart = () => {
    navigate("/");
    window.location.reload();
  };

  const musicPlay = () => {
    const audio = new Audio("assets/music/fantasy-placeholder.mp3");
    audio.loop = true;
    audioRef.current = audio;
    audio.volume = 0.5;
    audio.play();
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
  }, [audioRef, volume]);

  const handleTextSelection = (isSelected) => {
    if (isSelected && !hasTextBeenHighlighted) {
      setHasTextBeenHighlighted(true);
    }
    setIsTextSelected(isSelected);
  };

  return (
    <>
     <div className="screen">
      <main className="main">
        <div className="torch left"></div>
        <Routes>
          <Route path="/" element={<TitlePage musicPlay={musicPlay}/>} />
        </Routes>

        <div className="torch right"></div>
      </main>
      {!isTitlePage && (
        <div className="toolbar">
          <div className="drawer">
            <div className="spacer"></div>
            <div
              className={`hint-drawer ${isHintVisible ? "visible" : "hidden"}`}
            >
              <Hints />
            </div>
            <div
              className={`notes-drawer ${
                areNotesVisible ? "visible" : "hidden"
              }`}
            >
              <Notes hasTextBeenHighlighted={hasTextBeenHighlighted} />
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
  )
}

export default App
