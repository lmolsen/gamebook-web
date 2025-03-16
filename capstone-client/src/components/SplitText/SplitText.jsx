import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";
import "./SplitText.scss";

export default function SplitText({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll("h1, h2");

    elements.forEach((element) => {
      const { words } = splitText(element);
      
      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        }
      );
    });
  }, []);

  return <div className="container" ref={containerRef}>{text}</div>;
}
