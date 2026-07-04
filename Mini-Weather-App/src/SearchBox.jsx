import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";
export default function SearchBox({ getCity }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const apiGeoURL = "https://api.openweathermap.org/geo/1.0/direct";
  const apiURL = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = import.meta.env.VITE_WEATHER_API;
  let getWeatherInfo = async () => {
    try {
      let lcity = city.toLowerCase().trim();

      let response = await fetch(
        `${apiGeoURL}?q=${encodeURIComponent(lcity)}&limit=5&appid=${apiKey}`,
      );
      let jsonRes = await response.json();
      if (!jsonRes || jsonRes.length === 0) {
        throw "No such Place Found";
      }
      let finalRes = await fetch(
        `${apiURL}?q=${encodeURIComponent(lcity)}&appid=${apiKey}&units=metric`,
      );
      let jsonResponse = await finalRes.json();
      if (!finalRes.ok) {
        throw "Weather API request failed";
      }

      if (
        (jsonRes[0].local_names && jsonRes[0].local_names.en
          ? !jsonRes[0].local_names.en.toLowerCase().includes(lcity)
          : true) &&
        (jsonRes[0].name
          ? !jsonRes[0].name.toLowerCase().includes(lcity)
          : true) &&
        (jsonRes[0].state
          ? !jsonRes[0].state.toLowerCase().includes(lcity)
          : true) &&
        (jsonResponse.name
          ? !jsonResponse.name.toLowerCase().includes(lcity)
          : true)
      ) {
        throw "No such Place Found";
      }

      let result = {
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        cityName:
          (jsonRes[0].local_names && jsonRes[0].local_names.en) ||
          jsonResponse.name ||
          jsonRes[0].name,
        state: jsonRes[0].state,
        weather: jsonResponse.weather[0].description,
        main: jsonResponse.weather[0].main,
        icon: `https://openweathermap.org/payload/api/media/file/${jsonResponse.weather[0].icon}.png`,
      };
      return result;
    } catch {
      setError(true);
    }
  };
  let handleChange = (event) => {
    return setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let res = await getWeatherInfo();
    if (res) {
      getCity(res);
      setCity("");
      setError(false);
    } else {
      getCity({ cityName: "" });
    }
  };
  return (
    <div className="SearchBox">
      <form action="" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
      {error && <p>Sorry! No such place exist in our API.</p>}
    </div>
  );
}
