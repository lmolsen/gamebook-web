import "./TitlePage.scss";
import { Link } from "react-router-dom";
import SplitText from "../../components/SplitText/SplitText";

export default function TitlePage({ musicPlay }) {

  const text = (
    <div className="title-page__header">
      <h1 className="title-page__intro">Welcome to Gamebook Web.</h1>
      <h2 className="title-page__intro">Are you ready to begin your adventure?</h2>
    </div>
  );

  return (
    <div className="title-page">
      <SplitText text={text} />

      <div className="title-page__link">
        <Link to="/page1" onClick={musicPlay}>
          <p className="title-page__text">[Begin]</p>
        </Link>
      </div>
    </div>
  );
}
