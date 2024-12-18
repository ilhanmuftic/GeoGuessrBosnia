import React, { useState, useEffect, useRef } from "react";
import ResultsPopup from "./components/ResultsPopup";
import { getRandomLocation } from "./utils/randomLocation";
import { getDistance } from "./utils/distance";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs"; 
import Account from "./components/Profile"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [location, setLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false);
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

  const handleGuessSubmit = async (guessCoords) => {
    const [lat, lng] = guessCoords;
    const distance = getDistance(location, { lat, lng });

    const maxScore = 1000;
    const points = Math.max(0, maxScore - Math.floor(distance));

    setScore((prevScore) => prevScore + points);
    setLastGuess({ guess: [lat, lng], actual: location, distance });

    setShowResults(true);

    const currentLocation = getRandomLocation();
    if (!currentLocation) {
      setGameOver(true);
    } else {
      setLocation(currentLocation);
    }
  };

  const closeResults = () => {
    setShowResults(false);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Account />} />  {/* Use the renamed ProfilePage here */}
      </Routes>
    </Router>
  );
};

export default App;
