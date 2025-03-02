export type TemperatureData = {
  date: string;
  temperature: number;
};

export const convertTemperatureDataFromThreeHoursToEveryDayForecast = (
  data: TemperatureData[] | undefined
) => {
  if (!data) return;
  const newDate = [];
  let minTemperature = data[0].temperature;
  let maxTemperature = minTemperature;

  for (let i = 0; i < data.length; i++) {
    const current = data[i].date.slice(0, 10);
    const next = data[i + 1]?.date.slice(0, 10);

    if (data[i].temperature < minTemperature) {
      minTemperature = data[i].temperature;
    }

    if (data[i].temperature > maxTemperature) {
      maxTemperature = data[i].temperature;
    }

    if (current !== next) {
      newDate.push({
        date: current,
        minTemperature: +minTemperature.toFixed(0),
        maxTemperature: +maxTemperature.toFixed(0),
      });

      minTemperature = data[i + 1]?.temperature;
      maxTemperature = minTemperature;
    }
  }

  return newDate;
};
