import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
  Marker,
} from "react-leaflet";
import { useState } from "react";
import "./App.css";

function App() {
  const position = { lat: 50.556, lng: -3.959884643554688 };
  const initialCoords = {
    longitude: "",
    lat: ""
  }
  const [coordinates, setCoordinates] = useState(initialCoords)
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weather, setWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    setWeatherData(data);
    console.log("fetch weather data");
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setLongitude(e.latlng.lng);
        setLatitude(e.latlng.lat);
        // setPosition(e.latlng)
        console.log(e.latlng.lng);
        console.log(e.latlng.lat);
        console.log(`longitude: `, longitude);
        console.log(`latitude: `, latitude);
        setWeather(true);
        if (longitude) {
          getWeather();
        }
      },
    });
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
            <Popup>
              <p>Longitude: {longitude}</p>
              <p>Latitude: {latitude}</p>
              <p>Current temperature: {weatherData?.main.temp}°C.</p>
              <p>{weatherData?.weather[0].description}</p>
            </Popup>
          </Marker>
        )}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default App;
