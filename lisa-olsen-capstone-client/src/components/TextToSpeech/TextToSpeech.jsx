import "./TextToSpeech.scss";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function TextToSpeech( ) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const location = useLocation();

  const speak = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    speechSynthesis.cancel();

    const pageElements = document.querySelectorAll(".page > *:not(.ignore), .wall-of-fame");

    const text = [...pageElements].map((element) => element.innerText.trim()).join(" ");

    if (!text) {
      console.warn("No text found.");
      return;
    }

    let sentences = text.split(/(?<=[.!?]\s*|\])\s+/);

    const readText = (sentenceIndex = 0, optionIndex=1) => {
      if (sentenceIndex >= sentences.length) {
        setIsSpeaking(false);
        return;
      }

      const sentence = sentences[sentenceIndex];
      const isChoice = sentence.includes("[");
      const pauseDuration = isChoice ? 500 : 0;  

      const speech = new SpeechSynthesisUtterance(sentence);

      if (isChoice) {
        speech.text = `Option ${optionIndex}, ${sentence}`;
      } else {
        speech.text = sentence;
      }

      const voices = speechSynthesis.getVoices();
      speech.voice = voices.find((v) => v.name === "Google UK English Male") || voices[0];

      speech.onend = () => {
        setTimeout(() => {
    
          readText(sentenceIndex + 1,  isChoice ? optionIndex + 1 : optionIndex); 
        }, pauseDuration);  
      };

      if (voices.length === 0) {
        setTimeout(() => {
          readText(sentenceIndex); 
        }, 100);
      } else {
        speechSynthesis.speak(speech);  
      }
    };

    setIsSpeaking(true);
    readText();  
  };

  useEffect(() => {
    return () => {
        if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };
  }, [location, isSpeaking]);

  return (
    <button className="tts-button" onClick={speak}>
      {isSpeaking ? "Stop" : "Narrate"}
    </button>
  );
}

