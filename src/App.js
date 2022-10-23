import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Popup,
  Marker,
} from "react-leaflet";
import { useState } from "react";
import "./App.css";

function App() {
  // starting co-ordinates to centre map on Dartmoor.
  const position = { lat: 50.556, lng: -3.959884643554688 };
  // starting empty object for co-ordinates data.
  const initialCoords = {
    longi: "",
    lati: "",
  };
  const [coordinates, setCoordinates] = useState(initialCoords);
  const [weather, setWeather] = useState(false);
  const [weatherData, setWeatherData] = useState("");
 
  async function getWeather() {
    // Passes the co-ordinates from the onClick map event to fetch request.
    if (coordinates.longi) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.lati}&lon=${coordinates?.longi}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    }
    
  }

  function LocationMarker() {
    useMapEvent("click", (e) => {
      const { lng, lat } = e.latlng;
      // writes the new co-ordinates to state.
      setCoordinates(() => {
        return { longi: lng, lati: lat };
      });
      console.log(coordinates);
      // true/false state to control conditional render.
      setWeather(true);
      //
      getWeather()
    });
   

    
  }

  return (
    <div className="App">
      <MapContainer id="map" center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[coordinates?.lati, coordinates?.longi]}>
          {weatherData && (
            <Popup>
              <p>Longitude: {coordinates?.longi}</p>
              <p>Latitude: {coordinates?.lati}</p>
              <p>Current temperature: {weatherData?.main.temp}°C.</p>
              <p>{weatherData?.weather[0].description}</p>
            </Popup>
          )}
        </Marker>

        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default App;
