import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

import beepSound from "./../../assets/sounds/beep.wav";
import successSound from "./../../assets/sounds/success.wav";
import failSound from "./../../assets/sounds/fail.wav";

import "./Sequence.scss";

export default function Sequence({ puzzleSolved, setPuzzleSolved }) {
  const [playerInput, setPlayerInput] = useState([]);
  const [click, setClick] = useState(0);
  const [tries, setTries] = useState(() => {
    const storedTries = sessionStorage.getItem("sequenceTries");
    return storedTries ? JSON.parse(storedTries) : 0;
  });

  const sequenceRef = useRef([]);
  const puzzleSolvedRef = useRef(puzzleSolved);

  useEffect(() => {
    sessionStorage.setItem("sequenceTries", JSON.stringify(tries));
  }, [tries]);

  const nodes = [0, 1, 2, 3];

  let timeOut = 5000;

  useEffect(() => {
    if (puzzleSolved || tries >= 3) return;

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
  }, [puzzleSolved, tries]);

  useEffect(() => {
    puzzleSolvedRef.current = puzzleSolved;
  }, [puzzleSolved]);

  function startNewSequence() {
    if (puzzleSolved || tries >= 3) return;

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
    if (puzzleSolvedRef.current || tries >= 3) return;

    const element = document.getElementById(`node-${index}`);
    if (element) {
      element.classList.add("sequence__node--active");
      setTimeout(() => element.classList.remove("sequence__node--active"), 300);
    }
  }

  function handleClick(index) {
    if (puzzleSolved || tries >= 3) return;
    setClick(click + 1);
    let beepAudio = new Audio(beepSound);
    beepAudio.play();

    timeOut += 5000;
    const newPlayerInput = [...playerInput, index];
    setPlayerInput(newPlayerInput);

    const isCorrectSoFar = newPlayerInput.every(
      (num, i) => num === sequenceRef.current[i]
    );

    if (!isCorrectSoFar) {
      if (newPlayerInput.length >= 4) {
        setTries(tries + 1);
        setClick(0);
        setPlayerInput([]);

        setTimeout(() => {
          let failAudio = new Audio(failSound);
          failAudio.play();
        }, 300);
      }
      return;
    }

    if (newPlayerInput.length === sequenceRef.current.length) {
      setPuzzleSolved(true);
      setTimeout(() => {
        let successAudio = new Audio(successSound);
        successAudio.play();
      }, 300);
    }
  }

  function repeatSequence() {
    setClick(0);
    if (puzzleSolved || tries >= 3) {
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
            className={`sequence__node ${
              puzzleSolved ? "sequence__node--stabilized" : ""
            } ${tries > 2 && !puzzleSolved ? "sequence__node--error" : ""}`}
            whileTap={!puzzleSolved && tries < 3 ? { scale: 0.8 } : {}}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="sequence__counter">
        <div
          className={`sequence__try ${
            tries >= 1 ? "sequence__try--filled" : ""
          }`}
        ></div>
        <div
          className={`sequence__try ${
            tries >= 2 ? "sequence__try--filled" : ""
          }`}
        ></div>
        <div
          className={`sequence__try ${
            tries >= 3 ? "sequence__try--filled" : ""
          }`}
        ></div>
      </div>
      {tries >= 3 && !puzzleSolved && (
        <div className="sequence__text">Oh no, you're out of tries... </div>
      )}
    </div>
  );
}
