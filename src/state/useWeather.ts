import axios from "axios";
import { create } from "zustand";

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
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

interface WeatherState {
  city: CityData[];
  weatherForecast: WeatherData;
  getWeather: (url: string) => void;
  isWeatherLoading: boolean;
}

export const useWeather = create<WeatherState>((set) => ({
  city: [],
  weatherForecast: {} as WeatherData,
  isWeatherLoading: false,
  getWeather: async (url) => {
    set({ isWeatherLoading: true });
    const { data } = await axios.get(url);
    set({ city: data });

    const { lat, lon } = data[0];

    const getWeatherForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`;

    const weatherResponse = await axios.get(getWeatherForecastURL);

    console.log(weatherResponse.data);

    set({ weatherForecast: weatherResponse.data });

    set({ isWeatherLoading: false });
  },
}));
