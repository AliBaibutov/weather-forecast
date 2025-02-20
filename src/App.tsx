import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type CityData = {
  country: "GB";
  lat: number;
  local_names: object;
  lon: number;
  name: string;
  state: string;
};

type WeatherData = {
  cod: string;
};

function App() {
  const [city, setCity] = useState<CityData[]>();
  const [weatherForecast, setWeatherForecast] = useState<WeatherData>();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  console.log(weatherForecast);

  const getCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const getWeatherForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const getCity = useCallback(async () => {
    const { data } = await axios.get(getCityURL);

    console.log(data);

    setCity(data);
    setLat(data[0].lat);
    setLon(data[0].lon);
  }, [getCityURL]);

  const getWeather = useCallback(async () => {
    const { data } = await axios.get(getWeatherForecastURL);

    console.log(data);

    setWeatherForecast(data);
  }, [getWeatherForecastURL]);

  useEffect(() => {
    getCity();
    if (lat && lon) getWeather();
  }, [getCity, getWeather, lat, lon]);

  return (
    <>
      <div className="text-gray-600">{city && city[0].name}</div>
      <div className="text-gray-600">
        {weatherForecast && weatherForecast.cod}
      </div>
    </>
  );
}

export default App;
