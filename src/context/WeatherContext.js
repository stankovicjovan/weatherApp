import { createContext } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/WeatherApi";
import useGeolocation from "../hooks/useGeolocation";

const WeatherContext = createContext();
const API_KEY = "search.json?key=f9de7a1f2f65494a815103941220210";

export function WeatherProvider({ children }) {
  const [latitude, longitude] = useGeolocation();
  let GET_LOCATION = `&q=${Number(latitude).toFixed(2)},${Number(
    longitude
  ).toFixed(2)}`;

  // let GET_LOCATION = `&q=45.25,19.84`;

  console.log(GET_LOCATION);

  const [response, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: `${API_KEY}${GET_LOCATION}`,
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
