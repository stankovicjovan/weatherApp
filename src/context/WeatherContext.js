import { createContext } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/WeatherApi";
import useGeolocation from "../hooks/useGeolocation";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [latitude, longitude] = useGeolocation();
  let GET_LOCATION = `&q=${Number(latitude).toFixed(2)},${Number(
    longitude
  ).toFixed(2)}`;

  const [response, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `forecast.json?key=${process.env.REACT_APP_API_KEY}${GET_LOCATION}`,
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });
  return (
    <WeatherContext.Provider value={{ response, error, loading }}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;
