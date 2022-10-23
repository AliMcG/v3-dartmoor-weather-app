# Dartmoor Weather App V3

The final iteration (for now!) on the weather app theme. This iteration brings together the ideas from previous versions (fetching data, reactive use, etc...) and combines those with an interactive map.

# MVP

The M.V.P. for version 3 is a clickable map that shows a popup. Clicking on the popup shows the weather data (current temperature and current weather description) for the location clicked (using longitude and latitudes co-ordinates from the Map component.)

# Concepts

Uses "react-leaflet" npm package to access the Map component and features. Makes use of the "useMapEvent" hook from "react-leaflet" to get the longitude and latitude co-ordinates of the click event.

As fetching weather data is asynchronous, conditional rendering is used to control the render of popup.
When data is present the popup will show data onClick.

# Deployment
This app is deployed on AWS using the amplify feature. You can see the live site [here](https://main.d1z13l7xjcto8j.amplifyapp.com/).

# Next Steps
Next sprint goals are to add more functionality to the popup. Currently popups remain on the map. Using onclose attribute (maybe others) to see what if the popup can be removed onclose. Increasing the weather data shown, current only the current temp and description are shown. Possible 3 day forecast using the [Open Weather Map Api](https://openweathermap.org/api)

