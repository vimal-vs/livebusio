import React, {useState,useEffect} from 'react';
import Map, {NavigationControl,Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import Navbar from './components/navbar.js';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import db from './utils/firebase'
import { ref, set } from "firebase/database";

set(ref(db, 'location/'), {
  longitude: "ok",
  latitude: "ok"
});

function App() {
  const [long,setLong] = useState(78.686676); 
  const [lat,setLat] = useState(10.793190); 
  return (
    <div className="App">
      <Navbar/>
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 14
        }}
        style={{width: "100%", height: " calc(100vh - 62.4px)"}}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
      >
        <NavigationControl position="top-left" />
        <Marker
          longitude={(78.686676)}
          latitude={(10.793190)}
        />
      </Map>
    </div>
  );
}

export default App;
