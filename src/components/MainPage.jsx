import WeatherContext from "../context/WeatherContext";
import { useContext } from "react";

const MainPage = () => {
  const { response, error, loading } = useContext(WeatherContext);

  return <div>{console.log(response[0])}</div>;
};

export default MainPage;
