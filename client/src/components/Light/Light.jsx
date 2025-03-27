import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

import keySound from "./../../assets/sounds/key.wav";
import findSound from "./../../assets/sounds/key-found.wav";

import "./Light.scss";

export default function Light({
  setPuzzleSolved,
  puzzleSolved,
  effectAudioRef,
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!puzzleSolved) {
      let keyAudio = new Audio(keySound);
      keyAudio.volume = 1;
      keyAudio.play();
      effectAudioRef.current = keyAudio;
    }
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = Math.random() * (rect.width - 48 - 30) + 30;
      const newY = Math.random() * (rect.height - 48 - 30) + 30;
      setTargetPosition({ x: newX, y: newY });
    }
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleFind = () => {
    setPuzzleSolved(true);
    let findAudio = new Audio(findSound);
    findAudio.volume = 1;
    findAudio.play();
    effectAudioRef.current = findAudio;
  };

  return (
    <div
      ref={containerRef}
      className={`search ${puzzleSolved ? "search--squished" : ""}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="search__light"
        animate={{ left: cursorPosition.x, top: cursorPosition.y }}
        transition={{ type: "tween", duration: 0.05 }}
      />

      <motion.div
        onClick={handleFind}
        className={`search__key ${puzzleSolved ? "search__key--revealed" : ""}`}
        style={
          puzzleSolved ? {} : { left: targetPosition.x, top: targetPosition.y }
        }
        whileHover={!puzzleSolved ? { scale: 1.2 } : {}}
      >
        🔑
      </motion.div>
    </div>
  );
}
