// src/utils/randomLocation.js
const locations = [
    { lat: 43.8766766, lng: 18.3085449 }, // Sarajevo
    { lat: 43.8233919, lng: 18.3080378}, // SSST
    // { lat: 43.9807295, lng: 18.1785632}, // Visoko piramida (ne radi :(  )
    { lat: 43.859314, lng: 18.4289036}, // Begova dzamija
    { lat: 43.8591967, lng: 18.4334611}, // Vijecnica (iznutra)
    { lat: 43.8446246, lng: 18.3082248}, // Azici (crkva)
    { lat: 43.8790667, lng: 18.4122833},  // Pionirska
    // Add more coordinates as needed
  ];
  
  export const getRandomLocation = () => {
    console.log("Get random location ", locations)
    const randomIndex = Math.floor(Math.random() * locations.length);
    const randomLocation = locations[randomIndex];
    locations.splice(randomIndex, 1);
    console.log("Random location", randomLocation)
    return randomLocation;
  };
  