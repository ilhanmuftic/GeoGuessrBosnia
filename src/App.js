// src/App.js
import React, { useState, useEffect, useRef } from "react";
import Game from "./components/Game";
import ResultsPopup from "./components/ResultsPopup";
import { getRandomLocation } from "./utils/randomLocation";
import { getDistance } from "./utils/distance";

const App = () => {
  const [location, setLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Correctly handle the gameOver state
  const [showResults, setShowResults] = useState(false);
  const [lastGuess, setLastGuess] = useState(null);
  const [score, setScore] = useState(0);
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

    const points = 1000/distance;

    setScore((prevScore) => prevScore + points);
    setLastGuess({ guess: [lat, lng], actual: location, distance });

    console.log("Guess:", lastGuess?.guess);
    console.log("Actual:", lastGuess?.actual);
    setShowResults(true); // Trigger results popup


    const currentLocation = getRandomLocation();
    if (!currentLocation) {
      setGameOver(true); // End game when there are no locations left
    } else {
      setLocation(currentLocation); // Set new random location for the next guess
    }


  };

  const closeResults = () => {
    setShowResults(false);
  };


  return (
    <div>
      {!gameOver && location && (
        <Game handleGuessSubmit={handleGuessSubmit} location={location} />
      )}
      {gameOver && <div style={{fontSize: 50}}>You Won!</div>}
      <ResultsPopup
        show={showResults}
        onClose={closeResults}
        guess={lastGuess?.guess}
        actual={lastGuess?.actual}
        distance={lastGuess?.distance}
        score={score}
      />
    </div>
  );
};

export default App;
