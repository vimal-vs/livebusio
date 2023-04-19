import React, { useState } from 'react';
import Map, { NavigationControl, Marker, ScaleControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import Navbar from './components/navbar.js';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import db from './utils/firebase'
import { ref, onValue } from "firebase/database";
  
const db_location = ref(db, 'location/');
function App() {
  const [long,setLong] = useState(0); 
  const [lat,setLat] = useState(0);
  onValue(db_location, (snapshot) => {
  if(long!==snapshot.val().longitude)setLong(snapshot.val().longitude);
  if(lat!==snapshot.val().latitude)setLat(snapshot.val().latitude);
  console.log(long,lat);
  });
  return (
    <div className="App">
      <Navbar/>
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: 78.7047,
          latitude: 10.7905,
          zoom: 11
        }}
        style={{width: "100%", height: " calc(100vh - 62.4px)"}}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
      >
        <NavigationControl position="top-left" />
        <Marker
          longitude={long}
          latitude={lat}
        >
          <img src='/bus-stop.png' alt='bus-icon' style={{height: "2.5rem"}}/>
        </Marker>
        <ScaleControl />
      </Map>
    </div>
  );
}

export default App;
