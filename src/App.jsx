import Search from "./components/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { weather_api_key, weather_api_url } from "./components/api";
import { useState } from "react";
import Forecast from "./components/forecast";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

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

  return (
    
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
        
      </div>
    
  );
}

export default App;