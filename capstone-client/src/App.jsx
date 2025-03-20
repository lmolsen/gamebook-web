import "./App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import handleRestart from "./utils/restartUtils";

import TitlePage from "./pages/TitlePage/TitlePage";
import StoryPage from "./pages/StoryPage/StoryPage";
import Menu from "./components/Menu/Menu";
import WallOfFame from "./pages/WallOfFame/WallOfFame";
import TextToSpeech from "./components/TextToSpeech/TextToSpeech";

import skull from "./assets/images/skull.png";
import heart from "./assets/images/heart.png";
import brain from "./assets/images/brain.png";
import book from "./assets/images/book.png";
import treasure from "./assets/images/treasure.png";
import restart from "./assets/icons/restart.png";
import audioOn from "./assets/icons/audio-on.png";
import audioOff from "./assets/icons/audio-off.png";

import mainSong from "./assets/music/Video Dungeon Crawl.mp3";
import fastSong from "./assets/music/Video Dungeon Boss.mp3";
import happySong from "./assets/music/Bit Quest.mp3";
import treasureSong from "./assets/music/Overworld.mp3";
import deathSong from "./assets/music/Amazing Grace 2011.mp3";

import { useMusic } from "./utils/musicUtils";
import Credits from "./pages/Credits/Credits";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isTitlePage = location.pathname === "/";

  const [isDead, setIsDead] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [noteHighlight, setNoteHighlight] = useState(false);
  const [_isHighlighted, setIsHighlighted] = useState(false);

  const [wasHighlighted, setWasHighlighted] = useState(() => {
    const storedValue = sessionStorage.getItem("wasHighlighted");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [isSolved, setIsSolved] = useState(() => {
    const storedValue = sessionStorage.getItem("isSolved");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [isSpelled, setIsSpelled] = useState(() => {
    const storedValue = sessionStorage.getItem("isSpelled");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const {
    musicPlay,
    volume,
    handleVolumeChange,
    toggleMusic,
    isMusicOn,
    setMusicFilePath,
    musicStop,
  } = useMusic();

  useEffect(() => {
    sessionStorage.setItem("wasHighlighted", JSON.stringify(wasHighlighted));
    sessionStorage.setItem("isSolved", JSON.stringify(isSolved));
    sessionStorage.setItem("isSpelled", JSON.stringify(isSpelled));
  }, [wasHighlighted, isSolved, isSpelled, location]);

  useEffect(() => {
    if (symbol != "skull") {
      setIsDead(false);
    } else {
      setIsDead(true);
    }
  }, [symbol, location]);

  useEffect(() => {
    if (symbol === "brain") {
      setMusicFilePath(fastSong);
    } else if (symbol === "skull") {
      setMusicFilePath(deathSong);
    } else if (symbol === "heart") {
      setMusicFilePath(happySong);
    } else if (symbol === "treasure") {
      setMusicFilePath(treasureSong);
    } else {
      setMusicFilePath(mainSong);
    }
  }, [symbol]);

  const symbolImages = {
    skull,
    heart,
    brain,
    book,
    treasure,
  };

  useEffect(() => {
    if (location.pathname != "/") {
      musicPlay();
    }
  }, [location]);

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

  return (
    <div className="screen">
      <header className="header">
        {!isTitlePage && (
          <button className="header__restart" onClick={restartGame}>
            <img
              className={`header__icon ${
                isDead ||
                location.pathname === "/wall-of-fame" ||
                location.pathname === "/credits"
                  ? "header__icon--spinning"
                  : ""
              }`}
              src={restart}
              alt="Restart icon"
            />
          </button>
        )}
        {!isTitlePage && <TextToSpeech />}
        {!isTitlePage && (
          <button className="header__audio" onClick={toggleMusic}>
            <img
              className="header__icon"
              src={isMusicOn ? audioOn : audioOff}
              alt="Audio icon"
            />
          </button>
        )}
      </header>
      <main className="main">
        {symbol &&
          location.pathname != "/wall-of-fame" &&
          location.pathname != "/credits" && (
            <img
              className="symbol symbol--left"
              src={symbolImages[symbol] || book}
              alt="Page symbol"
            ></img>
          )}
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route
            path="/:pageId"
            element={
              <StoryPage
                isDead={isDead}
                setIsDead={setIsDead}
                isSolved={isSolved}
                setIsSolved={setIsSolved}
                setIsSpelled={setIsSpelled}
                wasHighlighted={wasHighlighted}
                setIsHighlighted={setIsHighlighted}
                setWasHighlighted={setWasHighlighted}
                setSymbol={setSymbol}
              />
            }
          />
          <Route path="/credits" element={<Credits />} />
          <Route path="/wall-of-fame" element={<WallOfFame />} />
        </Routes>
        {symbol &&
          location.pathname != "/wall-of-fame" &&
          location.pathname != "/credits" && (
            <img
              className="symbol symbol--right"
              src={symbolImages[symbol] || book}
              alt="Page symbol"
            ></img>
          )}
      </main>
      {!isTitlePage && (
        <Menu
          wasHighlighted={wasHighlighted}
          setWasHighlighted={setWasHighlighted}
          noteHighlight={noteHighlight}
          setNoteHighlight={setNoteHighlight}
          isSolved={isSolved}
          setIsSolved={setIsSolved}
          isSpelled={isSpelled}
          setIsSpelled={setIsSpelled}
          isDead={isDead}
          setIsDead={setIsDead}
          symbol={symbol}
          setSymbol={setSymbol}
          isMusicOn={isMusicOn}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          musicStop={musicStop}
          toggleMusic={toggleMusic}
        />
      )}
    </div>
  );
}

export default App;
