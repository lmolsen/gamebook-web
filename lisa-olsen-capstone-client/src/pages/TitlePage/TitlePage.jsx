import { Link, useLocation } from "react-router-dom";
import "./TitlePage.scss";
import SplitText from "../../components/SplitText/SplitText";

export default function TitlePage({ musicPlay }) {
  const location = useLocation();

  const text = (
    <div className="text">
      <h1 className="paragraph">Welcome to Gamebook Web.</h1>
      <p className="paragraph">Are you ready to begin your adventure?</p>
    </div>
  );

  return (
    <div className="title-page">
      <SplitText text={text} />

      <div className="options">
        <Link to="/page1" onClick={musicPlay}>
          <p className="options__text">[Begin]</p>
        </Link>
      </div>
    </div>
  );
}
