import { FC, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { convertTemperatureDataFromThreeHoursToEveryDayForecast } from "../utils/convertTemperatureDataFromThreeHoursToEveryDayForecast";
import { convertMainWeatherDataToEverydayForecast } from "../utils/convertMainWeatherDataToEverydayForecast";
import { WeatherData, WeatherDisplayData } from "../types";

type Props = {
  weatherForecast: WeatherData | null;
};

const temperatureHeading = "Температура, °C";
const pressureHeading = "Давление, гПа";
const humidityHeading = "Влажность, %";
const windHeading = "Ветер, м/с";

export const WeatherForecastChart: FC<Props> = ({ weatherForecast }) => {
  const temperatureThreeHoursData = weatherForecast?.list.map((item) => ({
    date: item.dt_txt,
    temperature: +item.main.temp.toFixed(0),
  }));

  const temperatureEveryDayData =
    convertTemperatureDataFromThreeHoursToEveryDayForecast(
      temperatureThreeHoursData
    );

  const pressureThreeHoursData = weatherForecast?.list.map((item) => ({
    date: item.dt_txt,
    pressure: +item.main.pressure.toFixed(0),
  }));

  const pressureEveryDayData = convertMainWeatherDataToEverydayForecast(
    pressureThreeHoursData,
    "pressure"
  );

  const humidityThreeHoursData = weatherForecast?.list.map((item) => ({
    date: item.dt_txt,
    humidity: +item.main.humidity,
  }));

  const humidityEveryDayData = convertMainWeatherDataToEverydayForecast(
    humidityThreeHoursData,
    "humidity"
  );

  const windThreeHoursData = weatherForecast?.list.map((item) => ({
    date: item.dt_txt,
    wind: +item.wind.speed.toFixed(0),
  }));

  const windEveryDayData = convertMainWeatherDataToEverydayForecast(
    windThreeHoursData,
    "wind"
  );

  const [weatherDisplayData, setWeatherDisplayData] = useState<
    WeatherDisplayData[] | undefined
  >(temperatureEveryDayData);
  const [chartHeading, setChartHeading] = useState<string>(temperatureHeading);

  const toggleTemperature = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const heading = target.textContent;

    switch (heading) {
      case temperatureHeading:
        setChartHeading(temperatureHeading);
        setWeatherDisplayData(temperatureEveryDayData);
        break;
      case pressureHeading:
        setChartHeading(pressureHeading);
        setWeatherDisplayData(pressureEveryDayData);
        break;
      case humidityHeading:
        setChartHeading(humidityHeading);
        setWeatherDisplayData(humidityEveryDayData);
        break;
      case windHeading:
        setChartHeading(windHeading);
        setWeatherDisplayData(windEveryDayData);
        break;
    }
  };

  const toggleEveryDayPeriod = () => {
    switch (chartHeading) {
      case temperatureHeading:
        setWeatherDisplayData(temperatureEveryDayData);
        break;
      case pressureHeading:
        setWeatherDisplayData(pressureEveryDayData);
        break;
      case humidityHeading:
        setWeatherDisplayData(humidityEveryDayData);
        break;
      case windHeading:
        setWeatherDisplayData(windEveryDayData);
        break;
    }
  };
  const toggleThreeOursPeriod = () => {
    switch (chartHeading) {
      case temperatureHeading:
        setWeatherDisplayData(temperatureThreeHoursData);
        break;
      case pressureHeading:
        setWeatherDisplayData(pressureThreeHoursData);
        break;
      case humidityHeading:
        setWeatherDisplayData(humidityThreeHoursData);
        break;
      case windHeading:
        setWeatherDisplayData(windThreeHoursData);
        break;
    }
  };

  if (!weatherForecast) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-9">
      <h3 className="text-3xl font-bold">{chartHeading}</h3>
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={toggleThreeOursPeriod}
          className="w-36 h-8 bg-blue-400 cursor-pointer rounded-2xl"
        >
          3 часа
        </button>
        <button
          onClick={toggleEveryDayPeriod}
          className="w-36 h-8 bg-blue-400 cursor-pointer rounded-2xl"
        >
          День
        </button>
        <button
          onClick={toggleTemperature}
          className="w-36 h-8 bg-blue-400 cursor-pointer rounded-2xl"
        >
          Температура, °C
        </button>
        <button
          onClick={toggleTemperature}
          className="w-36 h-8 bg-blue-400 cursor-pointer rounded-2xl"
        >
          Давление, гПа
        </button>
        <button
          onClick={toggleTemperature}
          className="w-36 h-8 bg-blue-400 cursor-pointer rounded-2xl"
        >
          Влажность, %
        </button>
        <button
          onClick={toggleTemperature}
          className="w-36 h-8 bg-blue-400 cursor-pointer rounded-2xl"
        >
          Ветер, м/с
        </button>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={weatherDisplayData}
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pressure"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="wind"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="minTemperature"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="maxTemperature"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
