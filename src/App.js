import React, { useState } from 'react';
import Map, { NavigationControl, Marker, ScaleControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import './navbar.css';
import db from './utils/firebase'
import { ref, onValue } from "firebase/database";
  
const db_location = ref(db, 'location/');
function App() {
  const [long,setLong] = useState(0); 
  const [lat,setLat] = useState(0);
  const [speed,setSpeed] = useState(0);
  const [satellites,setSatellites] = useState(0);

  const True  = "Stable";
  const False  = "Unstable";

  onValue(db_location, (snapshot) => {
    if(long!==snapshot.val().longitude)setLong(snapshot.val().longitude);
    if(lat!==snapshot.val().latitude)setLat(snapshot.val().latitude);
    if(speed!==snapshot.val().speed)setSpeed(snapshot.val().speed);
    if(satellites!==snapshot.val().satellites)setSatellites(snapshot.val().satellites);
    console.log(long,lat,speed,satellites);
  });
  return (
    <div className="App">
    <div className="nav">
      <a href='/'><h1>LiveBusIO</h1></a>
      <div className="nav-link">
        <h3>Speed : {Math.floor(speed)} km/hr</h3>
        <h3>Connection {(satellites>1) ? <img className='connection-icon' src='https://cdn-icons-png.flaticon.com/128/3699/3699516.png' /> : <img className='connection-icon' src='https://cdn-icons-png.flaticon.com/128/3389/3389152.png' />}</h3>
      </div>
    </div>
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: 78.7047,
          latitude: 10.7905,
          zoom: 11
        }}
        style={{width: "100%", height: "90vh"}}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
      >
        <NavigationControl position="top-left" />
        <Marker
          longitude={long}
          latitude={lat}
        >
          <img src='/bus-stop.png' alt='bus-icon' style={{height: "2.2rem"}}/>
        </Marker>
        <ScaleControl />
      </Map>
    </div>
  );
}

export default App;
