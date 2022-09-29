import { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/WeatherApi";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [response, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/",
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
