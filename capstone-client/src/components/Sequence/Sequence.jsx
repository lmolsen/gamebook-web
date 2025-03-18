import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import "./Sequence.scss";

export default function Sequence({ puzzleSolved, setPuzzleSolved }) {
  const [playerInput, setPlayerInput] = useState([]);
  const [click, setClick] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const sequenceRef = useRef([]);
  const puzzleSolvedRef = useRef(puzzleSolved);

  const nodes = [0, 1, 2, 3];

  let timeOut = 5000;

  useEffect(() => {
    if (puzzleSolved || attempts >= 3) return;

    if (sequenceRef.current.length === 0) {
      const newSequence = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 4)
      );
      sequenceRef.current = newSequence;

      startNewSequence();
    }

    return () => {
      clearTimeout();
    };
  }, [puzzleSolved, attempts]);

  useEffect(() => {
    puzzleSolvedRef.current = puzzleSolved;
  }, [puzzleSolved]);

  function startNewSequence() {
    if (puzzleSolved || attempts >= 3) return;

    setPlayerInput([]);
    let delay = 500;

    if (!puzzleSolved) {
      sequenceRef.current.forEach((node, index) => {
        setTimeout(() => flashNode(node), index * delay);
      });
    }

    setTimeout(() => {
      if (!puzzleSolved) {
        repeatSequence();
      }
    }, sequenceRef.current.length * 500);
  }

  function flashNode(index) {
    if (puzzleSolvedRef.current || attempts >= 3) return;

    const element = document.getElementById(`node-${index}`);
    if (element) {
      element.classList.add("sequence__node--active");
      setTimeout(() => element.classList.remove("sequence__node--active"), 300);
    }
  }

  function handleClick(index) {
    if (puzzleSolved || attempts >= 3) return; 
    setClick(click + 1);

    timeOut += 5000;
    const newPlayerInput = [...playerInput, index];
    setPlayerInput(newPlayerInput);

    const isCorrectSoFar = newPlayerInput.every(
      (num, i) => num === sequenceRef.current[i]
    );

  if (!isCorrectSoFar) {
      if (newPlayerInput.length >= 4) {
        setAttempts(attempts + 1);
        setClick(0);
        setPlayerInput([]);
      }
      return;
    }

    if (newPlayerInput.length === sequenceRef.current.length) {
      setPuzzleSolved(true);
    } 
  }

  function repeatSequence() {
    setClick(0);
    if (puzzleSolved || attempts >= 3) {
      return;
    }

    setTimeout(() => {
      if (!puzzleSolved) {
        startNewSequence();
      }
    }, timeOut);
  }

  return (
    <div className="sequence">
      <div className="sequence__nodes">
        {nodes.map((index) => (
          <motion.div
            key={index}
            id={`node-${index}`}
            className={`sequence__node ${puzzleSolved ? "sequence__node--stabilized" : ""} ${attempts > 2 && !puzzleSolved ? "sequence__node--error" : ""}`}
            whileTap={!puzzleSolved && attempts < 3 ? { scale: 0.8 } : {}}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="sequence__counter">
        <div
          className={`sequence__try ${attempts >= 1 ? "sequence__try--filled" : ""}`}
        ></div>
        <div
          className={`sequence__try ${attempts >= 2 ? "sequence__try--filled" : ""}`}
        ></div>
        <div
          className={`sequence__try ${attempts >= 3 ? "sequence__try--filled" : ""}`}
        ></div>
      </div>
      { attempts >= 3 && !puzzleSolved && (<div className="sequence__text">
        Oh no, you're out of tries...
      </div> )}
    </div>
  );
}
