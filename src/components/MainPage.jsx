import WeatherContext from "../context/WeatherContext";
import { useContext } from "react";

const MainPage = () => {
  const { response, error, loading } = useContext(WeatherContext);

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};

export default MainPage;
