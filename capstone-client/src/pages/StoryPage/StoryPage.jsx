import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Filter } from "bad-words";
import { postName } from "../../utils/apiUtils";
import { playPageSound, cleanupAudio } from "./../../utils/soundEffectUtils";

import doubleSound from "./../../assets/sounds/double.wav";
import singleSound from "./../../assets/sounds/single.wav";
import openSound from "./../../assets/sounds/open-door.wav";
import discSound from "./../../assets/sounds/stone-slide.wav";

import rune from "../../assets/images/rune.png";

import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator";
import Slide from "../../components/Slide/Slide";
import Light from "../../components/Light/Light";
import Dice from "../../components/Dice/Dice";
import Cube from "../../components/Cube/Cube";
import Sequence from "../../components/Sequence/Sequence";

import pageData from "../../data/pageData.json";

import "./StoryPage.scss";

export default function StoryPage({
  isDead,
  setIsDead,
  setIsSolved,
  isSolved,
  setIsSpelled,
  setIsHighlighted,
  setWasHighlighted,
  wasHighlighted,
  setSymbol,
}) {
  const { pageId } = useParams();
  const pageContent = pageData[pageId] || {};

  const effectAudioRef = useRef(null);

  const [name, setName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSilent, setIsSilent] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [transcript, setTranscript] = useState(() => {
    const savedTranscript = sessionStorage.getItem(`transcript`);
    return savedTranscript ? savedTranscript : "";
  });

  const [feat, setFeat] = useState(() => {
    const storedValue = sessionStorage.getItem("feat");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const hasPuzzle = pageContent.puzzle;

  const [puzzleSolved, setPuzzleSolved] = useState(() => {
    if (hasPuzzle) {
      const storedPuzzleState = sessionStorage.getItem(
        `puzzleSolved-${pageId}`
      );
      return storedPuzzleState ? JSON.parse(storedPuzzleState) : false;
    }
    return false;
  });

  const filter = new Filter();
  const location = useLocation();
  const navigate = useNavigate();

  // SPEAK speech recognition
  const correctAnswer = ["root root", "route route", "rootroot", "routeroute"];
  const alternateAnswer = ["syntax", "sin tax", "send text", "send tax"];

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
        const discAudio = new Audio(discSound);
        discAudio.volume = 0.8;
        discAudio.play();
        effectAudioRef.current = discAudio;
      }
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  useEffect(() => {
    if (transcript) {
      sessionStorage.setItem(`transcript`, transcript);
    }
  }, [transcript, pageId]);

  // PUZZLE solved and feat states
  useEffect(() => {
    if (hasPuzzle) {
      const storedPuzzleState = sessionStorage.getItem(
        `puzzleSolved-${pageId}`
      );
      const puzzleSolvedFromStorage = storedPuzzleState
        ? JSON.parse(storedPuzzleState)
        : false;
      setPuzzleSolved(puzzleSolvedFromStorage);
    }

    setSymbol(pageContent.symbol);
    if (feat && location.pathname === "/page9") {
      setSymbol("treasure");
    }
  }, [location]);

  useEffect(() => {
    sessionStorage.setItem("feat", JSON.stringify(feat));
  }, [feat]);

  // SOUND EFFECTS for page entry and cleanup for conditional
  useEffect(() => {
    const audioList = playPageSound(location.pathname, feat);

    return () => {
      cleanupAudio(audioList);

      if (effectAudioRef.current) {
        effectAudioRef.current.pause();
        effectAudioRef.current.currentTime = 0;
        effectAudioRef.current = null;
      }
    };
  }, [location]);

  useEffect(() => {
    if (hasPuzzle) {
      sessionStorage.setItem(
        `puzzleSolved-${pageId}`,
        JSON.stringify(puzzleSolved)
      );
    }
  }, [puzzleSolved, pageId, hasPuzzle]);

  // HIGHLIGHT selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection ? selection.toString() : "";

      if (selectedText.includes("rootroot")) {
        setPuzzleSolved(true);
        setIsHighlighted(true);
        setWasHighlighted(true);
      } else {
        setIsHighlighted(false);
      }
    };

    document.addEventListener("selectionchange", handleSelection);

    return () =>
      document.removeEventListener("selectionchange", handleSelection);
  }, [setIsHighlighted]);

  useEffect(() => {
    if (wasHighlighted && pageId === "page16") {
      let wordAudio = new Audio(doubleSound);
      wordAudio.volume = 1;
      wordAudio.play();
      effectAudioRef.current = wordAudio;
    }
  }, [wasHighlighted, pageId]);

  useEffect(() => {
    if (pageContent.dead || (pageContent.drop && !feat)) {
      setIsDead(true);
    }
  }, [setIsDead, pageContent]);

  // CUBE & RUNE text input handling
  const handleInput = (e) => {
    const value = e.target.value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const validRuneAnswers = ["edocsv"];
    const validCubeAnswers = ["syntax"];

    let isCorrect = false;

    if (pageContent.rune) {
      isCorrect = validRuneAnswers.includes(value);
    } else if (pageContent.cube) {
      isCorrect = validCubeAnswers.includes(value);
    }

    if (isCorrect) {
      setPuzzleSolved(true);
      setIsInvalid(false);
      if (pageContent.cube) {
        setIsSpelled(true);
        let cubeAudio = new Audio(singleSound);
        cubeAudio.volume = 1;
        cubeAudio.play();
        effectAudioRef.current = cubeAudio;
      }
      if (pageContent.rune) {
        let runeAudio = new Audio(openSound);
        runeAudio.volume = 1;
        runeAudio.play();
        effectAudioRef.current = runeAudio;
      }
    } else {
      setIsInvalid(true);
    }
  };

  // WALL OF FAME form submission
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
      const accomplishment = pageContent.accomplishment;
      await postName(accomplishment, name);
      navigate("/wall-of-fame");
      setName("");
    } catch (error) {
      console.error("There was a problem with submitting the form.", error);
    }
  };

  // FADE IN animation
  useEffect(() => {
    const storedState = sessionStorage.getItem("isFadeInOn");

    const isSessionFadeInOn =
      storedState !== null ? JSON.parse(storedState) : true;

    if (!isSessionFadeInOn) return;

    const hasAlreadyRun = sessionStorage.getItem(
      `animationCompleted-${pageId}`
    );

    if (hasAlreadyRun) return;

    const texts = document.querySelectorAll(".page__text");
    const totalTextElements = texts.length;

    texts.forEach((text) => {
      text.classList.remove("animate");
      setTimeout(() => text.classList.add("animate"), 0);
    });

    const totalDelay = totalTextElements * 1000;

    const pageElements = document.querySelectorAll(".select");

    pageElements.forEach((element) => {
      element.classList.remove("animate");
      element.classList.add("disable");
      element.style.opacity = 0;
      setTimeout(() => {
        element.classList.add("animate");
      }, totalDelay);

      setTimeout(() => {
        element.classList.remove("disable");
      }, totalDelay + 1800);
    });
    sessionStorage.setItem(`animationCompleted-${pageId}`, "true");
  }, [location, pageId]);

  // Check for lacking page content
  if (!pageContent) {
    return <div>Page content not found.</div>;
  }

  // scroll to top of page
  useEffect(() => {
    const page = document.querySelector(".page");
    page.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="page">
      <div className="page__story">
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
        <div className="slide select ignore">
          <Slide
            setPuzzleSolved={setPuzzleSolved}
            setIsSolved={setIsSolved}
            isSolved={isSolved}
            effectAudioRef={effectAudioRef}
          />
        </div>
      )}

      {pageContent.highlight && (
        <div className="paper select ignore">
          <p className="paper__text">
            Passphrase:<span className="paper__secret">rootroot</span>
          </p>
        </div>
      )}

      {pageContent.rune && (
        <div className="rune select ignore">
          <img className="rune__image" src={rune} alt="Magic rune" />
          <input
            onChange={handleInput}
            name="rune"
            className={`rune__input ${isInvalid ? "invalid" : ""}`}
            placeholder={
              !puzzleSolved
                ? "Write the name of the rune."
                : "Rune name: Edoc'sv"
            }
            disabled={puzzleSolved}
          ></input>
        </div>
      )}

      {pageContent.light && (
        <div className="light select ignore">
          <Light
            puzzleSolved={puzzleSolved}
            setPuzzleSolved={setPuzzleSolved}
            effectAudioRef={effectAudioRef}
          />
        </div>
      )}

      {pageContent.portal && (
        <div className="press select ignore">
          <Sequence
            puzzleSolved={puzzleSolved}
            setPuzzleSolved={setPuzzleSolved}
            effectAudioRef={effectAudioRef}
          />
        </div>
      )}
      {pageContent.dice && (
        <div className="dice select ignore">
          <Dice
            puzzleSolved={puzzleSolved}
            setPuzzleSolved={setPuzzleSolved}
            setFeat={setFeat}
            feat={feat}
            effectAudioRef={effectAudioRef}
          />
        </div>
      )}

      {pageContent.cube && (
        <div className="cubic select ignore">
          <Cube />
          <input
            placeholder={
              !puzzleSolved
                ? "Enter the word on the cube."
                : "Passphrase: syntax"
            }
            onChange={handleInput}
            name="cube"
            className={`cubic__input ${isInvalid ? "invalid" : ""}`}
            disabled={puzzleSolved}
          ></input>
        </div>
      )}

      {pageContent.speak && (
        <div className="speak select ignore">
          <button
            className="speak__button"
            onClick={startListening}
            disabled={isListening || puzzleSolved}
          >
            {puzzleSolved ? "Accepted" : isListening ? "Listening..." : "Speak"}
          </button>
          <p className="page__result">
            {`You have spoken: ${
              transcript
                ? transcript.toLowerCase() === "route route"
                  ? "rootroot."
                  : transcript.toLowerCase() === "send text"
                  ? "syntax."
                  : transcript + ". Nothing happens."
                : "..."
            }`}
          </p>

          {isSilent && !puzzleSolved && !hasSpoken && !transcript ? (
            <p className="page__prompt select">Cat got your tongue?</p>
          ) : (
            ""
          )}
        </div>
      )}

      {puzzleSolved && pageContent.solvedText && (
        <p className="page__text page__text--solved select">
          {pageContent.solvedText}
        </p>
      )}

      {pageContent.riddle && (
        <p className="page__riddle select">
          "No wings but tail have I / Yet still I travel through the sky."
        </p>
      )}

      {(pageContent.prompt || pageContent.dice) && (
        <div className="page__choices select">
          <p className="page__prompt">{pageContent.prompt}</p>
          {(puzzleSolved && hasPuzzle
            ? pageContent.solvedChoices
            : pageContent.choices
          )?.map((choice, index) => (
            <Link key={index} to={choice.link}>
              <p
                className={`page__choice ${
                  hasPuzzle && puzzleSolved ? "page__choice--solved" : ""
                } `}
              >
                {choice.text}
              </p>
            </Link>
          ))}
        </div>
      )}

      {pageContent.speak && puzzleSolved && (
        <div className="page__choices select">
          {correctAnswer.includes(transcript) && (
            <Link to="/page15">
              <p className="page__choice page__choice--solved">
                [Proceed to the ultimate treasure room.]
              </p>
            </Link>
          )}
          {alternateAnswer.includes(transcript) && (
            <Link to="/page9">
              <p className="page__choice page__choice--solved">
                [Proceed to the treasure room.]
              </p>
            </Link>
          )}
        </div>
      )}

      {pageContent.drop && (
        <>
          <div className="drop select">
            <p className="page__text">
              You fall a long way down, though it only takes a few moments.
              {feat
                ? " OW! You land on a pile of sacks. They're not exactly soft, but they're softer than the stone floor. You've survived the fall with magical boots in hand. Rubbing your sore tailbone, you head back out the way you came."
                : " In the instant before you hit the ground, you realize you really should have moved that pile of sacks earlier. SPLAT!"}
            </p>
          </div>
          <p className="page__prompt select">
            {feat
              ? "Congratulations! From now on, you'll be travelling in style!"
              : "You die."}
          </p>
        </>
      )}

      {pageContent.accomplishment && !isDead && (
        <form className="name select ignore" onSubmit={handleFormSubmit}>
          <input
            className="name__input"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name for the Wall of Fame."
            maxLength={50}
          ></input>
          <button className="name__button" type="Submit">
            Submit
          </button>
        </form>
      )}

      {isDead && location.pathname != "/credits" && (
        <div className="credits-path">
          <Link className="credits-path__link" to="/credits">
            [Credits]
          </Link>
        </div>
      )}

      <ScrollIndicator />
    </div>
  );
}
