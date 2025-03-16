import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import "./Sequence.scss";

export default function Sequence({ puzzleSolved, setPuzzleSolved }) {
  const [playerInput, setPlayerInput] = useState([]);
  const [click, setClick] = useState(0);
  const sequenceRef = useRef([]);
  const puzzleSolvedRef = useRef(puzzleSolved);

  const nodes = [0, 1, 2, 3];

  let timeOut = 5000;

  useEffect(() => {
    if (puzzleSolved) return;

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
  }, [puzzleSolved]);

  useEffect(() => {
    puzzleSolvedRef.current = puzzleSolved;
  }, [puzzleSolved]);

  function startNewSequence() {
    if (puzzleSolved) return;

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
    if (puzzleSolvedRef.current) return;

    const element = document.getElementById(`node-${index}`);
    if (element) {
      element.classList.add("sequence__node--active");
      setTimeout(() => element.classList.remove("sequence__node--active"), 300);
    }
  }

  function handleClick(index) {
    setClick(click+1);
    if (puzzleSolved) return;

    timeOut += 5000;
    const newPlayerInput = [...playerInput, index];
    setPlayerInput(newPlayerInput);

    if (
      newPlayerInput[newPlayerInput.length - 1] !==
      sequenceRef.current[newPlayerInput.length - 1]
    ) {
      return;
    }

    if (newPlayerInput.length === sequenceRef.current.length) {
      setPuzzleSolved(true);
    } 
  }

  function repeatSequence() {
    setClick(0);
    if (puzzleSolved) {
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
            className={`sequence__node ${puzzleSolved ? "sequence__node--stabilized" : ""}`}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      { click >= 4 && !puzzleSolved && (<div className="sequence__text">
        That's not right...
      </div> )}
    </div>
  );
}
