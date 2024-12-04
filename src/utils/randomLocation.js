// src/utils/randomLocation.js
const locations = [
    { lat: 43.8766766, lng: 18.3085449 }, // Sarajevo
    { lat: 43.8233919, lng: 18.3080378}, // SSST
    // Add more coordinates as needed
  ];
  
  export const getRandomLocation = () => {
    console.log("Get random location ", locations)
    const randomIndex = Math.floor(Math.random() * locations.length);
    const randomLocation = locations[randomIndex];
    locations.splice(randomIndex, 1);
    return randomLocation;
  };
  