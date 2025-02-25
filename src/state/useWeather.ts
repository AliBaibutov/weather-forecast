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

export type WeatherData = {
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
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
};

interface WeatherState {
  city: CityData[] | null;
  weatherForecast: WeatherData | null;
  getWeather: (url: string) => void;
  isWeatherLoading: boolean;
}

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
    }`;

    const weatherResponse = await axios.get(getWeatherForecastURL);

    console.log(weatherResponse.data);

    set({ weatherForecast: weatherResponse.data });

    set({ isWeatherLoading: false });
  },
}));
