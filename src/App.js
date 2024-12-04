// src/App.js
import React, { useState, useEffect, useRef } from "react";
import StreetView from "./components/StreetView";
import GuessMap from "./components/GuessMap";
import { getRandomLocation } from "./utils/randomLocation";
import 'leaflet/dist/leaflet.css';


const App = () => {
  const [location, setLocation] = useState(null);
  const [userGuess, setUserGuess] = useState(null);
    const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
        setLocation(getRandomLocation());
        hasRun.current = true;
        console.log("RAN USE EFFECT")

    }
  }, []);


  const handleGuessSubmit = (guessCoords) => {
    console.log('User guessed coordinates:', guessCoords);
    const [lat, lng] = guessCoords
    const distance = getDistance(location, { lat, lng });
    alert(`You were ${distance.toFixed(2)} km away!`);
    setLocation(getRandomLocation());
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
      {location && <StreetView lat={location.lat} lng={location.lng} />}
      <div style={{marginTop: '10px'}}>
        {<GuessMap onGuessSubmit={handleGuessSubmit}/>}
        
      </div>
      {userGuess && (
        <div>
          <h3>Your Guess:</h3>
          <p>Lat: {userGuess.lat}</p>
          <p>Lng: {userGuess.lng}</p>
        </div>
      )}
    </div>
  );
};

export default App;
