import { Link, useLocation } from "react-router-dom";
import "./TitlePage.scss";

export default function TitlePage({ musicPlay}) {
    const location = useLocation();

  return (
    <div className="title-page">
      <div className="text">
        <p className="paragraph">Welcome to Gamebook Web.</p>
        <p className="paragraph">Are you ready to begin your adventure?</p>
      </div>

      <div className="options">
        <Link to="/page1" onClick={musicPlay}>
          <p className="options__text">
            [Begin]
          </p>
        </Link>
      </div>
    </div>
  );
}
