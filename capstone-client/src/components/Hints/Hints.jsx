import "./Hints.scss"
import { useLocation } from "react-router-dom";

export default function Hints() {
    const location = useLocation();
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;


        return (
            <div className="hints">
              {location.pathname === "/page1" && <p className="hints__text">Tip: to challenge yourself, avoid looking at hints!</p>}
              {location.pathname === "/page2" && <p className="hints__text">Fools rush in.</p>}
              {location.pathname === "/page3" && <p className="hints__text">Use some common sense.</p>}
              {location.pathname === "/page4" && <p className="hints__text">You should listen to the narrator.</p>}
              {location.pathname === "/page5" && <p className="hints__text">All that glitters is not gold.</p>}
             {location.pathname === "/page6" && (<p className="hints__text"> {!isTouchDevice ? "Search slowly and the light will reveal the key." : "Tap wildly until you find the key!"}</p>)}
              {location.pathname === "/page7" && <p className="hints__text">A job well done is its own reward.</p>}
              {location.pathname === "/page8" && <p className="hints__text">Patience is key.</p>}
              {location.pathname === "/page9" && <p className="hints__text">Hard work pays off!</p>}
              {location.pathname === "/page10" && <p className="hints__text">Purple first, red last.</p>}
              {location.pathname === "/page11" && <p className="hints__text">Haven't you ever played D&D?</p>}
              {location.pathname === "/page12" && <p className="hints__text">Sorry, I'm no good at these puzzles either.</p>}
              {location.pathname === "/page13" && <p className="hints__text">Wait until the pattern of four completes.</p>}
              {location.pathname === "/page14" && <p className="hints__text">Have you learned any passphrases?</p>}
              {location.pathname === "/page15" && <p className="hints__text">Did you solve the sliding puzzle? Check your notes.</p>}
              {location.pathname === "/page16" && (<p className="hints__text">{!isTouchDevice ? "Perhaps if a mouse ran across the paper..." : "Maybe a long touch will do the trick..."}</p>)}
              {location.pathname === "/page17" && <p className="hints__text">Aww. What will you call them?</p>}
              {location.pathname === "/page18" && <p className="hints__text">Don't go mad with power now.</p>}
              {location.pathname === "/page19" && <p className="hints__text">I suggest investing most of it.</p>}
              {location.pathname === "/page20" && <p className="hints__text">Well, it could be worse. Not by much though.</p>}
              {location.pathname === "/page21" && <p className="hints__text">The wizard enjoyed very easy riddles.</p>}
              {location.pathname === "/page22" && <p className="hints__text">Ever heard of a Look-and-Say Sequence?</p>}
              {location.pathname === "/page23" && <p className="hints__text">Sometimes you really should listen to your parents.</p>}
              {location.pathname === "/page24" && <p className="hints__text">You're going to very sore if you ever wake up.</p>}
              {location.pathname === "/page25" && <p className="hints__text">What could go wrong, reading a magical madman's diary?</p>}
              {location.pathname === "/page26" && <p className="hints__text">I've heard feats of strength require a 6 to accomplish.</p>}
              {location.pathname === "/page27" && <p className="hints__text">I bet there's more puzzles to the left.</p>}
              {location.pathname === "/wall-of-fame" && <p className="hints__text">Every successful ending has a different associated accomplishment.</p>}
              {location.pathname === "/credits" && <p className="hints__text">Check out my GitHub for the code repos and full attributions!</p>}
            </div>
          );
        }