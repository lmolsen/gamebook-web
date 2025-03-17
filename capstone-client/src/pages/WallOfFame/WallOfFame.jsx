import "./WallOfFame.scss";
import React, { useState, useEffect } from "react";
import { fetchWallOfFame } from "../../utils/apiUtils";
import ScrollIndicator from "../../components/ScrollIndicator/ScrollIndicator";

export default function WallOfFame() {
  const [wallOfFame, setWallOfFame] = useState([]);

  useEffect(() => {
    fetchWallOfFame(setWallOfFame);
  }, []);

  return (
    <div className="wall-of-fame">
      <h1 className="wall-of-fame__title">Wall of Fame</h1>

      <div className="wall-of-fame__entries">
        {wallOfFame.length === 0 ? (
          <p>No accomplishments yet.</p>
        ) : (
          wallOfFame.map((entry) => (
            <div key={entry.id} className="wall-of-fame__entry">
              <p className="wall-of-fame__name">{entry.name}</p>
              <p className="wall-of-fame__accomplishment">
                {entry.accomplishment}
              </p>
            </div>
          ))
        )}
      </div>
      <ScrollIndicator />
    </div>
  );
}
