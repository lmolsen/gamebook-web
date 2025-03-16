import "./WallOfFame.scss"
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WallOfFame () {
    const [wallOfFame, setWallOfFame] = useState([]);
    const baseUrl = import.meta.env.VITE_API_URL;

    // getting
    useEffect(() => {
        const fetchWallOfFame = async () => {
          try {
            const response = await axios.get(`${baseUrl}/wall-of-fame`);
            setWallOfFame(response.data);
          } catch (error) {
            console.error("There was a problem retrieving the Wall of Fame data:", error);
          }
        };

        fetchWallOfFame();
    }, [])

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
                <p className="wall-of-fame__accomplishment">{entry.accomplishment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
}