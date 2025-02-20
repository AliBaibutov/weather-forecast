import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

type SearchInput = {
  city: string;
};

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

export const SearchInput = () => {
  const [city, setCity] = useState<CityData[]>();
  const [weatherForecast, setWeatherForecast] = useState<WeatherData>();

  const getWeather = async (url: string) => {
    const { data } = await axios.get(url);
    setCity(data);
    const { lat, lon } = data[0];

    const getWeatherForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`;

    const response = await axios.get(getWeatherForecastURL);

    setWeatherForecast(response.data);
  };

  const { register, handleSubmit } = useForm<SearchInput>();

  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    const getCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${
      data.city
    }&limit=1&appid=${import.meta.env.VITE_API_KEY}`;

    getWeather(getCityURL);
  };
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3/5 mt-10"
      >
        <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            type="text"
            id="price"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            placeholder="City"
            {...register("city", { required: true })}
          />
          <button
            type="submit"
            className="p-1.5 text-gray-600 cursor-pointer"
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      {city && city[0].name}
      {weatherForecast && weatherForecast.city.country}
    </div>
  );
};
