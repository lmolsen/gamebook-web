import "./Page1.scss";
import { Link } from "react-router-dom";

export default function Page1() {
    return (
        <div className="page">
        {/* <h1 className="page__title">The Beginning</h1> */}
        <div className="story">
          <p className="page__text">
            You stand before the entrance to the mad wizard's tower. You are an
            adventurer, the latest in a long line of treasure hunters who seek the
            priceless magical relics said to be housed within the spire. Some
            might call you a thief, but you take umbrage with that. Really, you're doing a public service by removing potentially dangerous artifacts.
          </p>
          <p className="page__text">
            The tower is tall and cylindrical, going up for many stories before
            ending in a pointed roof. The once-vibrant facade is now dark and
            choked with clinging ivy. Thick, thorny brambles circle the foot of the tower. The door in front of you is
            solid oak with no discernible handle or locking mechanism. Lacking in
            explosives as you are, you'd be unable to force your way through. 
          </p>
          <p className="page__text">You
          see only two paths available to you: climbing the ivy or checking for hidden entrances amongst the brambles.</p>
        </div>
        <div className="choices">
          <p className="page__prompt">Which path will you choose?</p>
          <Link to="/page3">
            <p className="page__choices">[Check for hidden entrances.]</p>
          </Link>
          <Link to="/page2">
            <p className="page__choices">[Risk the climb up the ivy.]</p>
          </Link>
          <Link to="/page4">
            <p className="page__choices">[Break down the front door.]</p>
          </Link>
        </div>
      </div>
    );
} 