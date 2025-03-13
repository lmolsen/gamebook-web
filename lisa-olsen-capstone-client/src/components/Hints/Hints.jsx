import "./Hints.scss"
import { useLocation } from "react-router-dom";

export default function Hints() {
    const location = useLocation();

        return (
            <div className="hints">
              {/* Different hints for every page */}
              {location.pathname === "/page1" && <p>You've just started -- what do you need a hint for?</p>}
              {location.pathname === "/page2" && <p>Use some common sense.</p>}
              {location.pathname === "/page3" && <p>Fools rush in.</p>}
              {location.pathname === "/page4" && <p>You should listen to the narrator.</p>}
              {location.pathname === "/page12" && <p>Perhaps if a mouse ran across the paper...</p>}
            </div>
          );
        }