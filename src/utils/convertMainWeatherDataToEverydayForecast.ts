export type PressureData = {
  date: string;
  pressure: number;
};

export type HumidityData = {
  date: string;
  humidity: number;
};

export type WindData = {
  date: string;
  wind: number;
};

export const convertMainWeatherDataToEverydayForecast = (
  data: PressureData[] | HumidityData[] | WindData[] | undefined,
  type: string
) => {
  if (!data) return;
  const newDate = [];

  let sum = 0;
  let count = 0;

  if (
    type === "pressure" &&
    data.every((d): d is PressureData => "pressure" in d)
  ) {
    for (let i = 0; i < data.length; i++) {
      const current = data[i].date.slice(0, 10);
      const next = data[i + 1]?.date.slice(0, 10);

      sum += data[i].pressure;
      count++;

      if (current !== next) {
        newDate.push({
          date: current,
          pressure: +(sum / count).toFixed(0),
        });

        sum = 0;
        count = 0;
      }
    }
  }

  if (
    type === "humidity" &&
    data.every((d): d is HumidityData => "humidity" in d)
  ) {
    for (let i = 0; i < data.length; i++) {
      const current = data[i].date.slice(0, 10);
      const next = data[i + 1]?.date.slice(0, 10);

      sum += data[i].humidity;
      count++;

      if (current !== next) {
        newDate.push({
          date: current,
          humidity: +(sum / count).toFixed(0),
        });

        sum = 0;
        count = 0;
      }
    }
  }

  if (type === "wind" && data.every((d): d is WindData => "wind" in d)) {
    for (let i = 0; i < data.length; i++) {
      const current = data[i].date.slice(0, 10);
      const next = data[i + 1]?.date.slice(0, 10);

      sum += data[i].wind;
      count++;

      if (current !== next) {
        newDate.push({
          date: current,
          wind: +(sum / count).toFixed(0),
        });

        sum = 0;
        count = 0;
      }
    }
  }

  return newDate;
};
