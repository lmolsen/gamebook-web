import "./TitlePage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import SplitText from "../../components/SplitText/SplitText";

export default function TitlePage() {
  const [isFadeInOn, setIsFadeInOn] = useState(() => {
    const storedState = sessionStorage.getItem("isFadeInOn");
    return storedState ? JSON.parse(storedState) : true;
  });

  const text = (
    <div className="title-page__header">
      <h1 className="title-page__intro">Welcome to Gamebook Web.</h1>
      <h2 className="title-page__intro">
        Are you ready to begin your adventure?
      </h2>
    </div>
  );

  const toggleFade = () => {
    const newState = !isFadeInOn;
    setIsFadeInOn(newState);
    sessionStorage.setItem("isFadeInOn", JSON.stringify(newState));
  };

  return (
    <div className="title-page">
      <SplitText text={text} />

      <div className="title-page__link">
        <Link to="/page1">
          <p className="title-page__text">[Begin]</p>
        </Link>
      </div>

      <label className="title-page__toggle">
        <input
          type="checkbox"
          className="title-page__input"
          checked={isFadeInOn}
          onChange={toggleFade}
        />
        <span className="title-page__slider"></span>
        <span className="title-page__label-text">Text Fade In</span>
      </label>
    </div>
  );
}
