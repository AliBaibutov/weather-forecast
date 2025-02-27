import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useWeather } from "../state/useWeather";
import { WeatherForecast } from "./WeatherForecast";
import { WeatherForecastChart } from "./WeatherForecastChart";

type SearchInput = {
  city: string;
};

export const SearchInput = () => {
  const weatherForecast = useWeather((state) => state.weatherForecast);
  const isWeatherLoading = useWeather((state) => state.isWeatherLoading);
  const getWeather = useWeather((state) => state.getWeather);

  const { register, handleSubmit } = useForm<SearchInput>();

  const onSubmit: SubmitHandler<SearchInput> = (data) => {
    const cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${
      data.city
    }&limit=1&appid=${import.meta.env.VITE_API_KEY}`;

    getWeather(cityURL);
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
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
      {!isWeatherLoading ? (
        <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
          <WeatherForecast weatherForecast={weatherForecast} />
          <WeatherForecastChart weatherForecast={weatherForecast} />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
