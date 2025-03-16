import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

import TitlePage from "./pages/TitlePage/TitlePage";
import PageLayout from "./components/PageLayout/PageLayout";
import Menu from "./components/Menu/Menu";
import WallOfFame from "./pages/WallOfFame/WallOfFame";
import TextToSpeech from "./components/TextToSpeech/TextToSpeech";

import { useAudio } from "./utils/audioUtils";

function App() {
  const location = useLocation();
  const isTitlePage = location.pathname === "/";

  const [isSolved, setIsSolved] = useState(false);
  const [isSpelled, setIsSpelled] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const { musicPlay } = useAudio();

  return (
      <div className="screen">
        <main className="main">
          <div className="torch torch--left"></div>
          {!isTitlePage && <TextToSpeech />}
          <Routes>
            <Route path="/" element={<TitlePage musicPlay={musicPlay} />} />
            <Route
              path="/:pageId"
              element={
                <PageLayout
                  isDead={isDead}
                  setIsDead={setIsDead}
                  isSolved={isSolved}
                  setIsSolved={setIsSolved}
                  setIsSpelled={setIsSpelled}
                />
              }
            />
            <Route path="/wall-of-fame" element={<WallOfFame />} />
          </Routes>
          <div className="torch torch--right"></div>
        </main>
        {!isTitlePage && (
          <Menu isSolved={isSolved} isSpelled={isSpelled} isDead={isDead} />
        )}
      </div>
  );
}

export default App;
