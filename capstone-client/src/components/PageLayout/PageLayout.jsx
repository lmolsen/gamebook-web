import "./PageLayout.scss";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import pageData from "./../../data/pageData.json";
import SlidingPuzzle from "../SlidingPuzzle/SlidingPuzzle";
import { Filter } from "bad-words";
import LightPuzzle from "../LightPuzzle/LightPuzzle";
import ScrollIndicator from "../ScrollIndicator/ScrollIndicator";
import Dice from "../Dice/Dice";
import Cube from "../Cube/Cube";
import Sequence from "../Sequence/Sequence";
import rune from "../../assets/images/rune.png";

export default function PageLayout({
  isDead,
  setIsDead,
  setIsSolved,
  isSolved,
  setIsSpelled,
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
  const [feat, setFeat] = useState(false);
  const correctAnswer = ["root root", "route route", "rootroot", "routeroute"];
  const alternateAnswer = ["syntax", "sin tax", "send text", "send tax"];
  const [name, setName] = useState("");

  const filter = new Filter();
  const baseUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

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
    if (pageContent.dead || (pageContent.drop && !feat)) {
      setIsDead(true);
    }
  }, [setIsDead, pageContent]);

  const handleInput = (e) => {
    const value = e.target.value.trim();

    if (
      pageContent.form &
      (value === "Edoc'sv" ||
        value === "edoc'sv" ||
        value === "edocsv" ||
        value === "Edocsv")
    ) {
      setPuzzleSolved(true);
    } else if (
      pageContent.cube &
      (value === "syntax" || value === "Syntax" || value === "send tax")
    ) {
      setPuzzleSolved(true);
      setIsSpelled(true);
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

      if (correctAnswer.includes(result) || alternateAnswer.includes(result)) {
        setPuzzleSolved(true);
      }
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // posting
  const postName = async () => {
    const accomplishment = pageContent.accomplishment;
    const newPost = {
      name,
      accomplishment,
    };

    try {
      await axios.post(`${baseUrl}/wall-of-fame`, newPost);
    } catch (error) {
      console.error("There was a problem with posting your name.", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (filter.isProfane(name)) {
      alert("Let's be adults here. Try again.");
      return;
    }

    try {
      await postName();
      navigate("/wall-of-fame");
      setName("");
    } catch (error) {
      console.error("There was a problem with submitting the form.", error);
    }
  };

  if (!pageContent) {
    return <div>Page not found</div>;
  }

  return (
    <div className="page">
      <div className="story">
        {pageContent.text && pageContent.text.length > 0 ? (
          pageContent.text.map((paragraph, index) => (
            <p key={index} className="page__text">
              {paragraph}
            </p>
          ))
        ) : (
          <p>No content available for this page.</p>
        )}
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
         <img className="form__image" src={rune} alt="Magic rune" />
          <input
            onChange={handleInput}
            className="input"
            placeholder="Write the name of the magic rune."
          ></input>
        </div>
      )}

      {pageContent.maze && (
        <div className="maze puzzle ignore">
          <LightPuzzle
            puzzleSolved={puzzleSolved}
            setPuzzleSolved={setPuzzleSolved}
          />
        </div>
      )}

      {pageContent.portal && (
        <div className="sequence puzzle ignore">
          <Sequence
            puzzleSolved={puzzleSolved}
            setPuzzleSolved={setPuzzleSolved}
          />
        </div>
      )}
      {pageContent.dice && (
        <div className="dice puzzle ignore">
          <Dice
            puzzleSolved={puzzleSolved}
            setPuzzleSolved={setPuzzleSolved}
            setFeat={setFeat}
          />
        </div>
      )}

      {pageContent.cube && (
        <div className="cube-puzzle">
          <Cube />
          <input
            placeholder="Enter the word on the cube."
            onChange={handleInput}
            className="cube-puzzle__input ignore"
          ></input>
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
            {`You have spoken: ${
              transcript
                ? transcript.toLowerCase() === "route route"
                  ? "rootroot."
                  : transcript.toLowerCase() === "send text"
                  ? "syntax."
                  : transcript + "."
                : "..."
            }`}
          </p>

          {isSilent && !puzzleSolved && !hasSpoken && !transcript ? (
            <p className="page__prompt">Cat got your tongue?</p>
          ) : (
            ""
          )}
        </div>
      )}

      {puzzleSolved && pageContent.solvedText && (
        <p className="page__text page__text--solved">
          {pageContent.solvedText}
        </p>
      )}

      <div className="choices">
        <p className="page__prompt">{pageContent.prompt}</p>
        {(puzzleSolved ? pageContent.solvedChoices : pageContent.choices)?.map(
          (choice, index) => (
            <Link key={index} to={choice.link}>
              <p
                className={`page__choices ${
                  puzzleSolved ? "page__choices--solved" : ""
                } `}
              >
                {choice.text}
              </p>
            </Link>
          )
        )}
      </div>

      {pageContent.speak && puzzleSolved && (
        <div className="choices">
          {correctAnswer.includes(transcript) && (
            <Link to="/page15">
              <p className="page__choices page__choices--solved">
                [Proceed to the ultimate treasure room.]
              </p>
            </Link>
          )}
          {alternateAnswer.includes(transcript) && (
            <Link to="/page9">
              <p className="page__choices page__choices--solved">
                [Proceed to the treasure room.]
              </p>
            </Link>
          )}
        </div>
      )}

      {pageContent.drop && (
        <>
          <p className="page__text">
            You fall a long way down, though it only takes a few moments.
            {feat
              ? " OW! You land in a pile of sacks. They're not exactly soft, but they're softer than the stone floor. You've survived the fall with magical boots in hand. Rubbing your sore tailbone, you head back out the way you came."
              : " In the instant before you hit the ground, you realize you really should have moved that pile of sacks earlier. SPLAT!"}
          </p>
          <p className="page__prompt">
            {feat
              ? "Congratulations! From now on, you'll be travelling in style!"
              : "You die."}
          </p>
        </>
      )}

      {pageContent.accomplishment && !isDead && (
        <form className="name" onSubmit={handleFormSubmit}>
          <input
            className="name__input ignore"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name for the wall of fame"
            maxLength={50}
          ></input>
          <button className="name__button" type="Submit">
            Submit
          </button>
        </form>
      )}

      <ScrollIndicator />
    </div>
  );
}
