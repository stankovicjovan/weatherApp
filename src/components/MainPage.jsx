import WeatherContext from "../context/WeatherContext";
import { useContext } from "react";

const MainPage = () => {
  const { response, error, loading } = useContext(WeatherContext);

  return <div>{response}</div>;
};

export default MainPage;
