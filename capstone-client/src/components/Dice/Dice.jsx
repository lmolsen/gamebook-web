import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import rollSound from "./../../assets/sounds/dice.wav";

import "./Dice.scss";

export default function Dice({ puzzleSolved, setPuzzleSolved, setFeat, feat }) {
  const [number, setNumber] = useState(() => (feat ? 6 : 1));
  const [rolling, setRolling] = useState(false);
  const [tries, setTries] = useState(() => {
    const storedTries = sessionStorage.getItem("diceTries");
    return storedTries ? JSON.parse(storedTries) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem("diceTries", JSON.stringify(tries));
  }, [tries]);

  const rollDice = () => {
    if (tries >= 3 || rolling || number === 6) return;

    let rollAudio = new Audio(rollSound);
    rollAudio.volume = 1;
    rollAudio.play();

    setRolling(true);
    setTries(tries + 1);
    let rollCount = 0;
    let finalNumber = 0;

    const interval = setInterval(() => {
      if (rollCount < 5) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setNumber(randomNumber);
        finalNumber = randomNumber;
        rollCount++;
      } else {
        clearInterval(interval);
        setRolling(false);

        if (finalNumber === 6) {
          setPuzzleSolved(true);
          setFeat(true);
        } else {
          setPuzzleSolved(false);
          setFeat(false);
        }
      }
    }, 100);
  };

  return (
    <div className="roll" onClick={rollDice}>
      <p className="roll__text">
        {puzzleSolved
          ? "RAAAH! You feel a surge of strength!"
          : tries === 1 || tries === 2
          ? "Ugh... it's so heavy."
          : tries < 3
          ? "Give it your best shot."
          : "Hurk! You think you've pulled something..."}
      </p>
      <motion.div
        className="roll__die"
        key={number}
        whileTap={
          tries < 3 && !puzzleSolved
            ? { scale: 0.8, transition: { type: "spring", stiffness: 1000 } }
            : {}
        }
        animate={{
          scale: 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="roll__face ignore">
          <span className="roll__number">{number}</span>
        </div>
      </motion.div>
      <div className="roll__counter">
        <div
          className={`roll__try ${tries >= 1 ? "roll__try--filled" : ""}`}
        ></div>
        <div
          className={`roll__try ${tries >= 2 ? "roll__try--filled" : ""}`}
        ></div>
        <div
          className={`roll__try ${tries >= 3 ? "roll__try--filled" : ""}`}
        ></div>
      </div>
      {tries > 3 ||
        (tries === 3 && !puzzleSolved && (
          <p className="roll__text roll__text--appear">
            Sorry, you're too tired to try again.
          </p>
        ))}
      {tries > 3 ||
        (tries === 3 && !puzzleSolved && (
          <Link to="/page27">
            <p className="roll__choice">
              [Continue up the stairs without moving the sacks.]
            </p>
          </Link>
        ))}
    </div>
  );
}
