import "./Hints.scss"
import { useLocation } from "react-router-dom";

export default function Hints() {
    const location = useLocation();

        return (
            <div className="hints">
              {/* Different hints for every page */}
              {location.pathname === "/page1" && <p>You've just started -- what do you need a hint for?</p>}
              {location.pathname === "/page2" && <p>Fools rush in.</p>}
              {location.pathname === "/page3" && <p>Use some common sense.</p>}
              {location.pathname === "/page4" && <p>You should listen to the narrator.</p>}
              {location.pathname === "/page6" && <p>Search slowly, and be sure to click the key.</p>}
              {location.pathname === "/page10" && <p>Purple first, red last.</p>}
              {location.pathname === "/page11" && <p>All that glitters is not gold.</p>}
              {location.pathname === "/page12" && <p>Sorry, I'm no good at these puzzles either.</p>}
              {location.pathname === "/page16" && <p>Perhaps if a mouse ran across the paper...</p>}
              {location.pathname === "/page26" && <p>I've heard feats of strength require a 6 to accomplish.</p>}
            </div>
          );
        }