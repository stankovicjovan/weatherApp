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

  const [responseForecast, errorForecast, loadingForecast] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `forecast.json?key=${process.env.REACT_APP_API_KEY}${GET_LOCATION}&days=5`,
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });
  return (
    <WeatherContext.Provider
      value={{ responseForecast, errorForecast, loadingForecast }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;
