import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import "./LightPuzzle.scss";

export default function LightPuzzle({
  setPuzzleSolved,
  puzzleSolved,
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = Math.random() * (rect.width - 48 - 30) + 30;
      const newY = Math.random() * (rect.height - 48- 30) + 30;
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

  return (
    <div
      ref={containerRef}
      className={`box ${puzzleSolved ? "box--squished" : ""}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="light"
        animate={{ left: cursorPosition.x, top: cursorPosition.y }}
        transition={{ type: "tween", duration: 0.05 }}
      />

      <motion.div
        onClick={() => setPuzzleSolved(true)}
        className={`key ${puzzleSolved ? "key--revealed" : ""}`}
        style={
          puzzleSolved
            ? {} 
            : { left: targetPosition.x, top: targetPosition.y }
        }
        whileHover={!puzzleSolved ? { scale: 1.2 } : {}}
      >
        🔑
      </motion.div>

    </div>
  );
}
