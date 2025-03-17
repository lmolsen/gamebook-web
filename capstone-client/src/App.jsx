import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

import TitlePage from "./pages/TitlePage/TitlePage";
import PageLayout from "./components/PageLayout/PageLayout";
import Menu from "./components/Menu/Menu";
import WallOfFame from "./pages/WallOfFame/WallOfFame";
import TextToSpeech from "./components/TextToSpeech/TextToSpeech";

import skull from "./assets/images/skull.png";
import heart from "./assets/images/heart.png";
import brain from "./assets/images/brain.png";
import book from "./assets/images/book.png";
import treasure from "./assets/images/treasure.png";

function App() {
  const location = useLocation();
  const isTitlePage = location.pathname === "/";

  const [isSolved, setIsSolved] = useState(false);
  const [isSpelled, setIsSpelled] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [wasHighlighted, setWasHighlighted] = useState(false);
  const [symbol, setSymbol] = useState(null);


  const symbolImages = {
    skull,
    heart,
    brain,
    book,
    treasure,
  };


  return (
    <div className="screen">
      <main className="main">
        {symbol && (
          <img
            className="symbol symbol--left"
            src={symbolImages[symbol] || book}
            alt="Page symbol"
          ></img>
        )}
        {!isTitlePage && <TextToSpeech />}
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route
            path="/:pageId"
            element={
              <PageLayout
                isDead={isDead}
                setIsDead={setIsDead}
                isSolved={isSolved}
                setIsSolved={setIsSolved}
                setIsSpelled={setIsSpelled}
                setWasHighlighted={setWasHighlighted}
                setSymbol={setSymbol}
                symbol={symbol}
              />
            }
          />
          <Route path="/wall-of-fame" element={<WallOfFame />} />
        </Routes>
        {symbol && (
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
          isSolved={isSolved}
          isSpelled={isSpelled}
          isDead={isDead}
        />
      )}
    </div>
  );
}

export default App;
