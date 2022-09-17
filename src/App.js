import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
  Marker,
} from "react-leaflet";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import "./App.css";

function App() {
  const position = { lat: 50.556, lng: -3.959884643554688 };
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [weather, setWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null)

  async function getWeather(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);
    setWeatherData(data.cod)
    console.log("fetch weather data")
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        // map.locate();
        setLongitude(e.latlng.lng);
        setLatitude(e.latlng.lat);
        // setPosition(e.latlng)
        // console.log(position)
        console.log(`longitude: `, longitude);
        console.log(latitude);
        setWeather(true);
        getWeather()
      },
      // locationfound(e) {
      //   setPosition(e.latlng);
      //   map.flyTo(e.latlng, map.getZoom());
      // },
    });

    // return position === null ? null : (
    //   <Marker position={position}>
    //     <Popup>You are here</Popup>
    //   </Marker>
    // );
  }

  return (
    <div className="App">
      <MapContainer id="map" center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {weather && (
          <Marker position={[latitude, longitude]}>
            {/* <div className="check">
              <p>Longitude: {longitude}</p>
              <p>Latitude: {latitude}</p>
            </div> */}
            {/* onClick={getWeather} */}

            
            <Popup>
              <p>Longitude: {longitude}</p>
              <p>Latitude: {latitude}</p>
              <p>weather data: {weatherData}</p>
              <p>Longitude: {longitude}</p>
              <p>Latitude: {latitude}</p>
              <p>weather data: {weatherData}</p>
              
            </Popup>
          </Marker>
        )}
        <LocationMarker />
      </MapContainer>
      ,
    </div>
  );
}

export default App;
