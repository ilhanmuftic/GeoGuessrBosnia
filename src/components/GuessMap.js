import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from "leaflet";

import 'leaflet/dist/leaflet.css';

const GuessMap = ({ onGuessSubmit }) => {
    const [markerPosition, setMarkerPosition] = useState([43.9159, 17.6791]); // Default Bosnia coords

    const crosshairIcon = new L.Icon({
        iconUrl: "/crosshair.svg", // Reference to the SVG in the public folder
        iconSize: [20, 20], // Size of the crosshair
        iconAnchor: [10, 10], // Center the icon on the map
        popupAnchor: [0, 0],
      });

    // Add a marker where the user clicks
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setMarkerPosition([e.latlng.lat, e.latlng.lng]);
            },
        });
        return null;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '20px', paddingRight: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Button */}
        <button
            onClick={() => onGuessSubmit(markerPosition)}
            style={{
                padding: '8px 16px', // Smaller button padding
                fontSize: '14px',     // Smaller text size
                marginRight: '20px',  // Reduced margin to keep it close to the map
                backgroundColor: '#4CAF50', // A nice background color
                color: 'white',         // White text for contrast
                border: 'none',         // Remove border
                borderRadius: '5px',    // Rounded corners
                cursor: 'pointer',   
                marginTop: 0,
                marginBottom: 'auto'   // Add pointer cursor
            }}
        >
            Submit Guess
        </button>
    
        {/* Map */}
        <div style={{ flexGrow: 1, maxWidth: '400px', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
            <MapContainer center={[43.9159, 17.6791]} zoom={7} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapClickHandler />
                <Marker position={markerPosition} icon={crosshairIcon} />
            </MapContainer>
        </div>
    </div>
    

    );
};

export default GuessMap;
