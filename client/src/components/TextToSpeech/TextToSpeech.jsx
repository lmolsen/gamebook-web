import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./TextToSpeech.scss";

export default function TextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const location = useLocation();

  let sentenceQueue = [];
  let currentSentenceIndex = 0;

  const speak = () => {
    if (isSpeaking && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    speechSynthesis.cancel();
    setIsSpeaking(true);
    setIsPaused(false);

    const pageElements = document.querySelectorAll(
      ".page > *:not(.ignore), .wall-of-fame, .credits"
    );

    const text = [...pageElements]
      .map((element) => element.innerText.trim())
      .join(" ");

    if (!text) {
      console.warn("No text found.");
      setIsSpeaking(false);
      return;
    }

    let sentences = text.split(/(?<=[.!?]\s*|\])\s+/);

    sentenceQueue = sentences;
    currentSentenceIndex = 0;

    const readText = (sentenceIndex = 0, optionIndex = 1) => {
      if (sentenceIndex >= sentenceQueue.length) {
        setIsSpeaking(false);
        return;
      }

      const sentence = sentenceQueue[sentenceIndex];
      const isChoice = sentence.includes("[");
      const pauseDuration = isChoice ? 500 : 0;

      const speech = new SpeechSynthesisUtterance(
        isChoice ? `Option ${optionIndex}, ${sentence}` : sentence
      );

      const voices = speechSynthesis.getVoices();

      speech.voice =
        voices.find((v) => v.name === "Google UK English Male") || voices[0];
      if (voices.length === 0) {
        setTimeout(() => {
          readText(sentenceIndex, optionIndex);
        }, 100);
        return;
      }

      speech.onend = () => {
        setTimeout(() => {
          if (!isPaused) {
            currentSentenceIndex = sentenceIndex + 1;
            readText(currentSentenceIndex, isChoice ? optionIndex + 1 : optionIndex);
          }
        }, pauseDuration);
      };

      speechSynthesis.speak(speech);
    };

    readText();
  };

  useEffect(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [location]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <button className="tts-button" onClick={speak}>
      {isSpeaking ? (isPaused ? "Resume" : "Pause") : "Narrate"}
    </button>
  );
}
