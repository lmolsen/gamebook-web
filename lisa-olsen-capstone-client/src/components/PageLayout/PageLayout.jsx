import "./PageLayout.scss";
import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pageData from "./../../data/pageData.json";
import SlidingPuzzle from "../SlidingPuzzle/SlidingPuzzle";

export default function PageLayout({
  setIsDead,
  setIsSolved,
  isSolved,
  setIsTextSelected,
  setHasTextBeenHighlighted
}) {
  const { pageId } = useParams();
  const pageContent = pageData[pageId] || {};
  const [puzzleSolved, setPuzzleSolved] = useState(pageContent.puzzleSolved);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection ? selection.toString() : "";
      console.log("test");
      if (selectedText.includes("rootroot")) {
        setIsTextSelected(true);
        setPuzzleSolved(true);
        setHasTextBeenHighlighted(true);
        console.log("True");
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

{puzzleSolved && pageContent.solvedText && (
    <p className="page__text">{pageContent.solvedText}</p>
  )}
      <div className="choices">
        <p className="page__prompt">{pageContent.prompt}</p>
        {(puzzleSolved ? pageContent.solvedChoices : pageContent.choices).map(
          (choice, index) => (
            <Link key={index} to={choice.link}>
              <p className="page__choices">{choice.text}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
