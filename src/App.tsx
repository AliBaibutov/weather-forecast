import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type CityData = {
  country: "GB";
  lat: number;
  local_names: object;
  lon: number;
  name: string;
  state: string;
};

function App() {
  const [city, setCity] = useState<CityData[]>();

  const getCityURL = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const getCity = useCallback(async () => {
    const { data } = await axios.get(getCityURL);

    console.log(data);

    setCity(data);
  }, [getCityURL]);

  useEffect(() => {
    getCity();
  }, [getCity]);

  return (
    <>
      <div className="text-gray-600">{city && city[0].name}</div>
    </>
  );
}

export default App;
