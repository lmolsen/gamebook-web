import "./Hints.scss"
import { useLocation } from "react-router-dom";

export default function Hints() {
    const location = useLocation();

        return (
            <div className="hints">
              {/* Different hints for every page */}
              {location.pathname === "/page1" && <p>Tip: to challenge yourself, avoid looking at hints!</p>}
              {location.pathname === "/page2" && <p>Fools rush in.</p>}
              {location.pathname === "/page3" && <p>Use some common sense.</p>}
              {location.pathname === "/page4" && <p>You should listen to the narrator.</p>}
              {location.pathname === "/page5" && <p>All that glitters is not gold.</p>}
              {location.pathname === "/page6" && <p>Search slowly, and be sure to click the key.</p>}
              {location.pathname === "/page7" && <p>A job well done is its own reward.</p>}
              {location.pathname === "/page8" && <p>Patience is key.</p>}
              {location.pathname === "/page9" && <p>Hard work pays off!</p>}
              {location.pathname === "/page10" && <p>Purple first, red last.</p>}
              {location.pathname === "/page11" && <p>Haven't you ever played D&D?</p>}
              {location.pathname === "/page12" && <p>Sorry, I'm no good at these puzzles either.</p>}
              {location.pathname === "/page13" && <p>Wait until the pattern of four completes.</p>}
              {location.pathname === "/page14" && <p>Have you learned any passphrases?</p>}
              {location.pathname === "/page15" && <p>Did you solve the sliding puzzle? Check your notes.</p>}
              {location.pathname === "/page16" && <p>Perhaps if a mouse ran across the paper...</p>}
              {location.pathname === "/page17" && <p>Aww. What will you call them?</p>}
              {location.pathname === "/page18" && <p>Don't go mad with power now.</p>}
              {location.pathname === "/page19" && <p>I suggest investing most of it.</p>}
              {location.pathname === "/page20" && <p>Well, it could be worse. Not by much though.</p>}
              {location.pathname === "/page21" && <p>The wizard enjoyed very easy riddles.</p>}
              {location.pathname === "/page22" && <p>Ever heard of a Look-and-Say Sequence?</p>}
              {location.pathname === "/page23" && <p>Sometimes you really should listen to your parents.</p>}
              {location.pathname === "/page24" && <p>You're going to very sore if you ever wake up.</p>}
              {location.pathname === "/page25" && <p>What could go wrong, reading a magical madman's diary?</p>}
              {location.pathname === "/page26" && <p>I've heard feats of strength require a 6 to accomplish.</p>}
              {location.pathname === "/page27" && <p>I bet there's more puzzles to the left.</p>}
            </div>
          );
        }