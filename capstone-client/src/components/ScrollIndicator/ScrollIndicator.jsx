import React, { useState, useEffect } from "react";
import "./ScrollIndicator.scss";

export default function ScrollIndicator() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const pageElement = document.querySelector(".page, .wall-of-fame, .credits");

    const checkScrollable = () => {
      if (pageElement) {
        setIsScrollable(pageElement.scrollHeight > pageElement.clientHeight);
        checkIfAtBottom();
      }
    };

    const checkIfAtBottom = () => {
      if (pageElement) {
        setAtBottom(
          pageElement.scrollTop + pageElement.clientHeight >=
            pageElement.scrollHeight - 1
        );
      }
    };

    checkScrollable();

    pageElement?.addEventListener("scroll", checkIfAtBottom);
    window.addEventListener("resize", checkScrollable);

    const observer = new MutationObserver(checkScrollable);
    observer.observe(pageElement, { childList: true, subtree: true });

    return () => {
      pageElement?.removeEventListener("scroll", checkIfAtBottom);
      window.removeEventListener("resize", checkScrollable);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const pageElement = document.querySelector(".page");
    if (pageElement) {
      if (isScrollable) {
        pageElement.classList.add("page--scrollable");
      } else {
        pageElement.classList.remove("page--scrollable");
      }
    }
  }, [isScrollable]);

  return (
    <>
      {isScrollable && !atBottom && (
        <div className="scroll ignore">
          <div className="scroll__indicator">
            <p className="scroll__text">
              {location.pathname === "/wall-of-fame"
                ? "More below"
                : "Choices below"}
            </p>
            ⌄
          </div>
        </div>
      )}
    </>
  );
}
