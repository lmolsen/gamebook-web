import React, { useState, useEffect } from "react";
import "./ScrollIndicator.scss";

export default function ScrollIndicator() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const pageElement = document.querySelector(".page");

    const checkScrollable = () => {
      if (pageElement) {
        setIsScrollable(pageElement.scrollHeight > pageElement.clientHeight);
        checkIfAtBottom();
      }
    };

    const checkIfAtBottom = () => {
      if (pageElement) {
        setAtBottom(pageElement.scrollTop + pageElement.clientHeight >= pageElement.scrollHeight - 1);
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

  return (
    <>
      {isScrollable && !atBottom && (
        <div className="scroll-indicator">
          <div className="scroll-indicator__icon">⌄</div>
        </div>
      )}
    </>
  );
}
