import { useState, useEffect } from "react";
import { motion } from "motion/react";

import puzzleImage from "./../../assets/images/rune-light.jpg";
import stoneSound from "./../../assets/sounds/stone-bass.wav";
import dingSound from "./../../assets/sounds/ding.wav";

import "./Slide.scss";

export default function Slide({
  setPuzzleSolved,
  setIsSolved,
  isSolved,
  effectAudioRef,
}) {
  const GRID_SIZE = 3;
  const MISSING_TILE = 0;
  const IMAGE_URL = puzzleImage;

  const stoneAudio = new Audio(stoneSound);
  stoneAudio.volume = 1;

  const generateGrid = () => {
    let numbers;
    do {
      numbers = [...Array(GRID_SIZE * GRID_SIZE).keys()];
      numbers.sort(() => Math.random() - 0.5);
    } while (!isSolvable(numbers));
    return numbers;
  };

  const isSolvable = (tiles) => {
    const inversionCount = tiles.reduce((invCount, current, i) => {
      if (current === MISSING_TILE) return invCount;
      for (let j = i + 1; j < tiles.length; j++) {
        if (tiles[j] !== MISSING_TILE && tiles[j] < current) {
          invCount++;
        }
      }
      return invCount;
    }, 0);

    return inversionCount % 2 === 0;
  };

  const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const [grid, setGrid] = useState(generateGrid());
  const [imageVisible, setImageVisible] = useState(() => {
    const savedVisibility = sessionStorage.getItem("imageVisible");
    return savedVisibility !== null ? JSON.parse(savedVisibility) : false;
  });

  const missingIndex = grid.indexOf(MISSING_TILE);

  const isMovable = (index) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(missingIndex / GRID_SIZE);
    const emptyCol = missingIndex % GRID_SIZE;

    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const handleMove = (index) => {
    if (!isMovable(index) || isSolved) return;

    stoneAudio.play();
    effectAudioRef.current = stoneAudio;

    const newGrid = [...grid];
    [newGrid[index], newGrid[missingIndex]] = [
      newGrid[missingIndex],
      newGrid[index],
    ];

    setGrid(newGrid);
  };

  useEffect(() => {
    const checkSolved = () => {
      if (JSON.stringify(grid) === JSON.stringify(solvedState)) {
        setIsSolved(true);
        setPuzzleSolved(true);
        setTimeout(() => {
          setImageVisible(true);
          let orderedAudio = new Audio(dingSound);
          orderedAudio.volume = 1;
          orderedAudio.play();
          effectAudioRef.current = orderedAudio;
        }, 200);
      }
    };

    checkSolved();
  }, [grid]);

  const reshuffle = () => {
    stoneAudio.play();
    effectAudioRef.current = stoneAudio;

    setGrid(generateGrid());
    setIsSolved(false);
  };

  // // KEEP FOR TESTING
  // const autoSolve = () => {
  //   setGrid(solvedState);
  //   setIsSolved(true);
  //   setTimeout(() => {
  //     setImageVisible(true);
  //   }, 200);
  // };

  useEffect(() => {
    sessionStorage.setItem("imageVisible", JSON.stringify(imageVisible));
  }, [imageVisible]);

  return (
    <div className="sliding-puzzle">
      <div className="sliding-puzzle__grid">
        {grid.map((num, index) => {
          const row = Math.floor((num - 1) / GRID_SIZE);
          const col = (num - 1) % GRID_SIZE;

          return (
            <motion.div
              key={num}
              className={`sliding-puzzle__tile ${
                num === MISSING_TILE ? "sliding-puzzle__tile--empty" : ""
              } ${isSolved ? "sliding-puzzle__tile--solved" : ""}`}
              onClick={() => handleMove(index)}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                backgroundImage:
                  num !== MISSING_TILE ? `url(${IMAGE_URL})` : "none",
                backgroundPosition: `${-col * 6.25}rem ${-row * 6.25}rem`,
              }}
            />
          );
        })}
        {isSolved && (
          <div
            className={`sliding-puzzle__image ${
              imageVisible ? "sliding-puzzle__image--visible" : ""
            }`}
          />
        )}
      </div>

      {!isSolved && (
        <>
          {/* <button
            className="sliding-puzzle__button"
            onClick={autoSolve}
            disabled={isSolved}
          >
            Auto-solve
          </button> */}
          <button
            className="sliding-puzzle__button"
            onClick={reshuffle}
            disabled={isSolved}
          >
            Reshuffle
          </button>
        </>
      )}
    </div>
  );
}
