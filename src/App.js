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
  // starting co-ordinates to centre map on Dartmoor.
  const position = { lat: 50.556, lng: -3.959884643554688 };
  // starting empty object for co-ordinates data.
  const initialCoords = {
    longi: "",
    lati: ""
  }
  const [coordinates, setCoordinates] = useState(initialCoords)
  const [weather, setWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function getWeather() {
    console.log("coords inside getWeather", coordinates)
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.lati}&lon=${coordinates?.longi}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        // deconstructs the event.object to get the lng and lat.
        const { lng, lat }  = e.latlng
        // writes the new co-ordinates to state.
        setCoordinates(() => {
          return { longi: lng, lati: lat};
        })
        // true/false state to control conditional render.
        setWeather(true);
        if (coordinates.longi) {
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
          <Marker position={[coordinates?.lati, coordinates?.longi]}>
            <Popup>
              <p>Longitude: {coordinates?.long}</p>
              <p>Latitude: {coordinates?.lati}</p>
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
