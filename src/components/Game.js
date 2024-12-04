// src/components/Game.js
import React, { useState } from "react";
import StreetView from "./StreetView";
import GuessMap from "./GuessMap";

const Game = ({ handleGuessSubmit, location }) => {
  const [userGuess, setUserGuess] = useState(null); // Track user's guess

  return (
    <div>
      {location && <StreetView lat={location.lat} lng={location.lng} />}
      <div style={{ marginTop: "10px" }}>
        <GuessMap
          onGuessSubmit={(guessCoords) => {
            handleGuessSubmit(guessCoords); // Submit guess and pass to parent
            setUserGuess(guessCoords); // Track guess locally
          }}
        />
      </div>
      {userGuess && (
        <div>
          <h3>Your Guess:</h3>
          <p>Lat: {userGuess[0]}</p>
          <p>Lng: {userGuess[1]}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
