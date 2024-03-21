import Search from "./components/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { weather_api_key, weather_api_url } from "./components/api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(true);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.spilt(" ");

    const currentWeatherFetch = fetch(
      `${weather_api_url}weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );

    const forecastFetch = fetch(
      `${weather_api_url}forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);

  return (
    
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        <CurrentWeather data={currentWeather} />
        
      </div>
    
  );
}

export default App;
