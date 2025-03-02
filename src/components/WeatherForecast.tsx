import { FC } from "react";
import { WeatherData } from "../types";

type Props = {
  weatherForecast: WeatherData | null;
};

export const WeatherForecast: FC<Props> = ({ weatherForecast }) => {
  if (!weatherForecast) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{weatherForecast?.city?.name}</h1>
      <h2 className="text-xl font-semibold">
        {weatherForecast?.city?.country}
      </h2>
      <div className="flex items-center justify-center">
        <img
          src={`http://openweathermap.org/img/wn/${weatherForecast?.list[0]?.weather[0]?.icon}.png`}
          alt={weatherForecast?.list[0]?.weather[0]?.description}
          className="w-20 h-20"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-bold">
            {weatherForecast?.list[0].main &&
              weatherForecast?.list[0]?.main?.temp.toFixed(0)}
            °C
          </p>
          <p className="text-xl font-semibold">
            {weatherForecast?.list[0]?.weather[0]?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
