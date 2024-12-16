// src/utils/randomLocation.js
const locations = [
  { name: 'Sarajevo', lat: 43.8766766, lng: 18.3085449 },
  { name: 'SSST', lat: 43.8233919, lng: 18.3080378 },
  { name: 'Begova dzamija', lat: 43.859314, lng: 18.4289036 },
  { name: 'Vijecnica (iznutra)', lat: 43.8591967, lng: 18.4334611 },
  { name: 'Azici (crkva)', lat: 43.8446246, lng: 18.3082248 },
  { name: 'Pionirska', lat: 43.8790667, lng: 18.4122833 },
  // Add more locations as needed
  // { lat: 43.9807295, lng: 18.1785632}, // Visoko piramida (ne radi :(  )
  ];
  
  export const getLocations = () => {
    return locations;
  };
  
  export const getRandomLocation = () => {
    console.log("Get random location ", locations)
    const randomIndex = Math.floor(Math.random() * locations.length);
    const randomLocation = locations[randomIndex];
    locations.splice(randomIndex, 1);
    console.log("Random location", randomLocation)
    return randomLocation;
  };
  