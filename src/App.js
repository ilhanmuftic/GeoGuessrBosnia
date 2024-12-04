// src/App.js
import React, { useState, useEffect, useRef } from "react";
import Game from "./components/Game";
import { getRandomLocation } from "./utils/randomLocation";
import { getDistance } from "./utils/distance";

const App = () => {
  const [location, setLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Correctly handle the gameOver state
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setLocation(getRandomLocation()); // Initialize with random location
      hasRun.current = true;
    }
  }, []);

  const handleGuessSubmit = (guessCoords) => {
    console.log("User guessed coordinates:", guessCoords);
    const [lat, lng] = guessCoords;
    const distance = getDistance(location, { lat, lng });

    alert(`You were ${distance.toFixed(2)} km away!`);

    const currentLocation = getRandomLocation();
    if (!currentLocation) {
      setGameOver(true); // End game when there are no locations left
    } else {
      setLocation(currentLocation); // Set new random location for the next guess
    }
  };


  return (
    <div>
      {!gameOver && location && (
        <Game handleGuessSubmit={handleGuessSubmit} location={location} />
      )}
      {gameOver && <div style={{fontSize: 50}}>You Won!</div>}
    </div>
  );
};

export default App;
