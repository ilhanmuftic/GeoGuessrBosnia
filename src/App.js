// src/App.js
import React, { useState, useEffect, useRef } from "react";
import Game from "./components/Game";
import { getRandomLocation } from "./utils/randomLocation";

const App = () => {
  const [location, setLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Correctly handle the gameOver state
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setLocation(getRandomLocation()); // Initialize with random location
      hasRun.current = true;
      console.log("RAN USE EFFECT");
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

  const getDistance = (loc1, loc2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) *
        Math.cos(loc2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
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
