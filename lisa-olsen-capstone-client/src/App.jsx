import './App.scss'
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import TitlePage from './pages/TitlePage/TitlePage';
import Page1 from "./pages/Page1/Page1";
import Page2 from "./pages/Page2/Page2";
import Page3 from "./pages/Page3/Page3";
import Page4 from "./pages/Page4/Page4";
import Page5 from "./pages/Page5/Page5";
import Page6 from "./pages/Page6/Page6";
import Page7 from "./pages/Page7/Page7";
import Page8 from "./pages/Page8/Page8";
import Page9 from "./pages/Page9/Page9";
import Page10 from "./pages/Page10/Page10";
import Page11 from "./pages/Page11/Page11";
import Page12 from "./pages/Page12/Page12";
import Page13 from "./pages/Page13/Page13";
import Page14 from "./pages/Page14/Page14";
import Page15 from "./pages/Page15/Page15";
import Page16 from "./pages/Page16/Page16";
import Page17 from "./pages/Page17/Page17";
import Page18 from "./pages/Page18/Page18";
import Page19 from "./pages/Page19/Page19";
import Page20 from "./pages/Page20/Page20";
import WallOfFame from './pages/WallOfFame/WallOfFame';
import Hints from './components/Hints/Hints';
import Notes from './components/Notes/Notes';
import TextToSpeech from './components/TextToSpeech/TextToSpeech';

import { useAudio } from './utils/audioUtils'
import { useToggles } from './utils/toggleUtils'; 
import { useTextSelection } from './utils/textUtils'; 

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isTitlePage = location.pathname === "/";

  // util hooks
  const { musicPlay, volume, handleVolumeChange } = useAudio();
  const { isHintVisible, areNotesVisible, isAudioVisible, toggleHint, toggleNotes, toggleAudio } = useToggles();
  const { isTextSelected, hasTextBeenHighlighted, handleTextSelection } = useTextSelection();

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
        {!isTitlePage && ( <TextToSpeech /> )}
        <Routes>
          <Route path="/" element={<TitlePage musicPlay={musicPlay}/>} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 setIsDead={setIsDead} />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route
            path="/page12"
            element={
              <Page12
                setIsTextSelected={handleTextSelection}
                hasTextBeenHighlighted={hasTextBeenHighlighted}
              />
            }
          />
          <Route path="/walloffame" element={<WallOfFame />} />
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
