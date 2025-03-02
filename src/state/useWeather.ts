import axios from "axios";
import { create } from "zustand";
import { CityData, WeatherData } from "../types";

type WeatherState = {
  city: CityData[] | null;
  weatherForecast: WeatherData | null;
  getWeather: (url: string) => void;
  isWeatherLoading: boolean;
};

export const useWeather = create<WeatherState>((set) => ({
  city: null,
  weatherForecast: null,
  isWeatherLoading: false,
  getWeather: async (url) => {
    set({ isWeatherLoading: true });

    const { data } = await axios.get(url);

    set({ city: data });

    const { lat, lon } = data[0];

    const getWeatherForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&lang=ru&units=metric`;

    const weatherResponse = await axios.get(getWeatherForecastURL);

    set({ weatherForecast: weatherResponse.data });
    set({ isWeatherLoading: false });
  },
}));
