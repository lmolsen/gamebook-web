import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TextToSpeech.scss";

export default function TextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const location = useLocation();

  const sentenceQueueRef = useRef([]);
  const currentSentenceIndexRef = useRef(0);
  const isChoiceRef = useRef(false);
  const optionIndexRef = useRef(1);
  const speakingRef = useRef(false);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const readText = () => {
    const sentences = sentenceQueueRef.current;
    const i = currentSentenceIndexRef.current;

    if (i >= sentences.length) {
      setIsSpeaking(false);
      speakingRef.current = false;
      return;
    }

    const sentence = sentences[i];
    const isChoice = sentence.includes("[");
    const pauseDuration = isChoice ? 500 : 0;

    isChoiceRef.current = isChoice;

    const speech = new SpeechSynthesisUtterance(
      isChoice ? `Option ${optionIndexRef.current}, ${sentence}` : sentence
    );

    const voices = speechSynthesis.getVoices();
    speech.voice =
      voices.find((v) => v.name === "Google UK English Male") || voices[0];

    if (voices.length === 0) {
      // Retry if voices aren't ready yet
      setTimeout(readText, 100);
      return;
    }

    speech.onend = () => {
      speakingRef.current = false;
      currentSentenceIndexRef.current += 1;
      if (isChoice) optionIndexRef.current += 1;

      if (!isPaused) {
        setTimeout(() => readText(), pauseDuration);
      }
    };

    speakingRef.current = true;
    speechSynthesis.speak(speech);
  };

  const startSpeech = () => {
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

    const sentences = text.split(/(?<=[.!?\]])\s+/); // better sentence split
    sentenceQueueRef.current = sentences;
    currentSentenceIndexRef.current = 0;
    optionIndexRef.current = 1;

    readText();
  };

  const pauseSpeech = () => {
    if (isMobile) {
      setIsPaused(true);
      setIsSpeaking(true);
      speechSynthesis.cancel(); // cancel current utterance
      speakingRef.current = false;
    } else {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (isMobile) {
      setIsPaused(false);
      setIsSpeaking(true);
      if (!speakingRef.current) {
        readText(); // resume manually
      }
    } else {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const toggleSpeech = () => {
    if (!isSpeaking) {
      startSpeech();
    } else if (!isPaused) {
      pauseSpeech();
    } else {
      resumeSpeech();
    }
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
    <button className="tts-button" onClick={toggleSpeech}>
      {isSpeaking ? (isPaused ? "Resume" : "Pause") : "Narrate"}
    </button>
  );
}
