import { FC } from "react";
import { WeatherData } from "../state/useWeather";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  weatherForecast: WeatherData | null;
};

type TemperatureData = {
  date: string;
  temperature: number;
};

export const WeatherForecastChart: FC<Props> = ({ weatherForecast }) => {
  console.log(weatherForecast);

  const temperatureData: TemperatureData[] = [];

  weatherForecast?.list.forEach((item) => {
    if (item.dt_txt.includes("12:00:00")) {
      temperatureData.push({
        date: item.dt_txt,
        temperature: Math.round(item.main.temp - 273.15),
      });
    }
  });

  if (!weatherForecast) {
    return <div>Нет данных</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={temperatureData}
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
        <Legend />
        <Bar dataKey="temperature" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
