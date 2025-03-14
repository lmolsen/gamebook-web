import "./PageLayout.scss";
import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pageData from "./../../data/pageData.json";
import SlidingPuzzle from "../SlidingPuzzle/SlidingPuzzle";
import { Filter } from "bad-words";
import LightPuzzle from "../LightPuzzle/LightPuzzle";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";

export default function PageLayout({
  setIsDead,
  setIsSolved,
  isSolved,
  setIsTextSelected,
  setHasTextBeenHighlighted,
}) {
  const { pageId } = useParams();
  const pageContent = pageData[pageId] || {};
  const [puzzleSolved, setPuzzleSolved] = useState(pageContent.puzzleSolved);
  const [isListening, setIsListening] = useState(false);
  const [isSilent, setIsSilent] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasSpoken, setHasSpoken] = useState(false);

  const filter = new Filter();

  
  const location = useLocation();

  useEffect(() => {
    setPuzzleSolved(false);
  }, [location]);


  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection ? selection.toString() : "";
      if (selectedText.includes("rootroot")) {
        setIsTextSelected(true);
        setPuzzleSolved(true);
        setHasTextBeenHighlighted(true);
      } else {
        setIsTextSelected(false);
      }
    };

    document.addEventListener("selectionchange", handleSelection);

    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, [setIsTextSelected]);

  useEffect(() => {
    if (pageContent.dead) {
      setIsDead(true);
    }
  }, [setIsDead, pageContent]);

  // const handlePuzzleSolve = () => {
  //     setPuzzleSolved(true);
  //   };

  const handleInput = (e) => {
    const value = e.target.value.trim();

    if (
      value === "Edoc'sv" ||
      value === "edoc'sv" ||
      value === "edocsv" ||
      value === "Edocsv"
    ) {
      setPuzzleSolved(true);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setIsSilent(false);
      setHasSpoken(false);
    };

    setTimeout(() => {
      recognition.stop();
      setIsListening(false);

      if (!hasSpoken) {
        setIsSilent(true);
      }
    }, 5000);

    recognition.onresult = (event) => {
      let result = event.results[0][0].transcript.trim().toLowerCase();

      const cleanedTranscript = filter.clean(result);

      if (result) {
        setIsSilent(false);
        setHasSpoken(true);
        setTranscript(cleanedTranscript);
      }

      if (
        result === "route route" ||
        result === "root root" ||
        result === "routeroute" ||
        result === "rootroot"
      ) {
        setPuzzleSolved(true);
      }
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  if (!pageContent) {
    return <div>Page not found</div>;
  }

  return (
    <div className="page">
      <div className="story">
        {pageContent.text.map((paragraph, index) => (
          <p key={index} className="page__text">
            {paragraph}
          </p>
        ))}
      </div>

      {pageContent.slide && (
        <div className="puzzle ignore">
          <SlidingPuzzle
            setPuzzleSolved={setPuzzleSolved}
            setIsSolved={setIsSolved}
            isSolved={isSolved}
          />
        </div>
      )}
      {pageContent.highlight && (
        <div className="paper puzzle ignore">
          <p>
            Passphrase: <span className="paper__secret">rootroot</span>
          </p>
        </div>
      )}

      {pageContent.form && (
        <div className="form puzzle ignore">
          <input
            onChange={handleInput}
            className="input"
            placeholder="Write the name of the magic rune."
          ></input>
        </div>
      )}

{pageContent.maze&& (
        <div className="maze puzzle ignore">
      <LightPuzzle puzzleSolved={puzzleSolved}   setPuzzleSolved={setPuzzleSolved}/>
        </div>
      )}

      {pageContent.speak && (
        <div className="speak puzzle ignore">
          <button
            className={`speak-button ${
              puzzleSolved ? "speak-button--disabled" : ""
            }`}
            onClick={startListening}
            disabled={isListening || puzzleSolved}
          >
            {puzzleSolved
              ? "Passphrase accepted"
              : isListening
              ? "Listening..."
              : "Speak the passphrase"}
          </button>
          <p className="page__prompt">
            <>
              You have spoken:{" "}
              {transcript
                ? (transcript.toLowerCase() === "route route"
                    ? "rootroot"
                    : transcript) + "."
                : "..."}
            </>
          </p>

          {isSilent && !puzzleSolved && !hasSpoken && !transcript ? (
            <p className="page__prompt">Cat got your tongue?</p>
          ) : (
            ""
          )}
        </div>
      )}

      {puzzleSolved && pageContent.solvedText && (
        <p className="page__text page__text--solved">{pageContent.solvedText}</p>
      )}
      <div className="choices">
        <p className="page__prompt">{pageContent.prompt}</p>
        {(puzzleSolved ? pageContent.solvedChoices : pageContent.choices).map(
          (choice, index) => (
            <Link key={index} to={choice.link}>
              <p className={`page__choices ${puzzleSolved ? "page__choices--solved" : ""} `}>{choice.text}</p>
            </Link>
          )
        )}
      </div>

      <ScrollIndicator />
    </div>
  );
}
