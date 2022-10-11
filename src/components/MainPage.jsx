import { useContext, useState } from "react";
import { GoLocation } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import WeatherContext from "../context/WeatherContext";

const MainPage = () => {
  const { responseForecast, errorForecast, loadingForecast } =
    useContext(WeatherContext);

  const [temperatureUnit, setTemperatureUnit] = useState(false);

  const navigate = useNavigate();

  const changeUnit = (e) => {
    e.preventDefault();
    setTemperatureUnit(!temperatureUnit);
  };

  const changePage = (queryParam) => {
    navigate(`/detail-page/${queryParam}`);
  };

  return (
    <div className="max-w-3xl bg-blue-500 h-screen">
      {loadingForecast && (
        <h1 className="text-center pt-48 text-4xl">LoadingForecast...</h1>
      )}
      {!loadingForecast && errorForecast && (
        <p className="text-red mx-auto pt-1/2">{errorForecast}</p>
      )}
      {!loadingForecast && !errorForecast && responseForecast?.location && (
        <section className="p-4">
          <span className="flex pt-16 gap-2 justify-center items-center text-center text-3xl sm:text-4xl">
            <img
              className="w-12 h-12 sm:w-14 sm:h-14 ml-0 mr-2"
              src={responseForecast?.current?.condition?.icon}
              alt=""
            />
            <h1>{responseForecast?.location?.name}</h1>
            <span className="mr-0 ml-2">
              <GoLocation />
            </span>
          </span>
          <div className="flex flex-col align-center mt-4">
            <div
              className="text-8xl hover:cursor-pointer"
              onClick={() =>
                changePage(responseForecast?.forecast.forecastday[0]?.date)
              }
            >
              {temperatureUnit
                ? responseForecast?.current.temp_f
                : responseForecast?.current.temp_c}
              <span className="ml-4 text-6xl hover:cursor-pointer">
                {temperatureUnit ? "°F" : "°C"}
              </span>
            </div>
            <div
              className="mt-4 pb-6 w-full flex justify-center gap-4
             border-b border-blue-300"
            >
              <button
                className="px-2 py-1 border border-blue-300 rounded-md hover:bg-blue-400 ease-in-out duration-300"
                onClick={changeUnit}
              >
                {temperatureUnit ? "To Celsius" : "To Fahrenheit"}
              </button>
              <div className="flex justify-center gap-2 w-fit mx-0">
                <div className="text-xl mx-0">
                  {temperatureUnit
                    ? responseForecast?.forecast.forecastday[0]?.day.mintemp_f
                    : responseForecast?.forecast.forecastday[0]?.day?.mintemp_c}
                  <span className="ml-1">{temperatureUnit ? "°F" : "°C"}</span>
                </div>
                <span className="mx-0">—</span>
                <div className="text-xl mx-0">
                  {temperatureUnit
                    ? responseForecast?.forecast.forecastday[0]?.day.maxtemp_f
                    : responseForecast?.forecast.forecastday[0]?.day?.maxtemp_c}
                  <span className="ml-1">{temperatureUnit ? "°F" : "°C"}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-1 xs:gap-2 justify-evenly w-full">
              {responseForecast?.forecast.forecastday?.slice(1).map((item) => (
                <div
                  onClick={() => changePage(item?.date)}
                  key={item.date}
                  className="flex flex-col items-center m-0 px-4 xs:px-6 xs:py-2 sm:px-8  border border-blue-300 rounded-md hover:bg-blue-400 hover:cursor-pointer ease-in-out duration-300"
                >
                  <span className="pb-2 mb-2 border-b border-blue-300 w-full text-center hover:cursor-pointer">
                    {item.date.slice(5)}
                  </span>
                  <div className="text-lg xs:text-xl">
                    {temperatureUnit
                      ? item.day.maxtemp_f.toFixed(1)
                      : item.day.maxtemp_c.toFixed(1)}
                    <span className="xs:ml-1 text-sm">
                      {temperatureUnit ? "°F" : "°C"}
                    </span>
                  </div>
                  <img
                    className="w-10 h-10 sm:w-14 sm:h-14"
                    src={item.day.condition.icon}
                    alt=""
                  />
                  <div className="text-lg xs:text-xl">
                    {temperatureUnit
                      ? item.day.mintemp_f.toFixed(1)
                      : item.day.mintemp_c.toFixed(1)}
                    <span className="xs:ml-1 text-sm">
                      {temperatureUnit ? "°F" : "°C"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MainPage;
