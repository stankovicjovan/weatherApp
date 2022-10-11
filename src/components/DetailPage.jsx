import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import WeatherContext from "../context/WeatherContext";
import { GoLocation } from "react-icons/go";
import { BsSunrise, BsSunset, BsDroplet, BsCloudRain } from "react-icons/bs";
import { WiMoonset, WiMoonrise } from "react-icons/wi";
import { TbWind, TbGauge, TbTemperature } from "react-icons/tb";
import { ImArrowUp2, ImArrowDown2 } from "react-icons/im";
import "../App.css";

const DetailPage = () => {
  const { responseForecast, errorForecast, loadingForecast } =
    useContext(WeatherContext);

  const location = useLocation();
  const queryDate = location.pathname.slice(-10);

  const [distanceUnit, setDistanceUnit] = useState(true);

  const changeUnit = (e) => {
    e.preventDefault();
    setDistanceUnit(!distanceUnit);
  };

  return (
    <div className="container bg-blue-500 h-screen p-2 sm:p-4">
      {loadingForecast && (
        <h1 className="text-center pt-48 text-4xl">LoadingForecast...</h1>
      )}
      {!loadingForecast && errorForecast && (
        <p className="text-red mx-auto pt-1/2">{errorForecast}</p>
      )}
      <div className="pt-4">
        {!loadingForecast &&
          !errorForecast &&
          responseForecast.forecast &&
          responseForecast?.forecast.forecastday
            ?.filter((item) => {
              return item.date === queryDate;
            })
            .map((item) => (
              <section key={item.date}>
                <div className="flex flex-col align-center pb-8 mt-4">
                  <span className="text-xl">{item.date}</span>
                  <span className="flex justify-center items-center text-center text-3xl sm:text-4xl">
                    <img
                      className="w-12 h-12 sm:w-14 sm:h-14 ml-0"
                      src={item.day?.condition?.icon}
                      alt=""
                    />
                    <h1>{responseForecast?.location?.name}</h1>
                    <span className="mr-0 ml-2">
                      <GoLocation />
                    </span>
                  </span>
                  <div className="text-6xl hover:cursor-pointer mb-3">
                    {item.day?.avgtemp_c}
                    <span className="ml-4 text-4xl hover:cursor-pointer">
                      °C
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex gap-2">
                      {responseForecast.current.is_day === 0 ? (
                        <WiMoonset className="text-2xl" />
                      ) : (
                        <BsSunrise className="text-2xl" />
                      )}
                      <span className="text-lg">
                        {responseForecast.current.is_day === 0
                          ? item.astro.moonset
                          : item.astro.sunrise}
                      </span>
                    </span>
                    —
                    <span className="flex gap-2">
                      <span className="text-lg">
                        {responseForecast.current.is_day === 0
                          ? item.astro.moonrise
                          : item.astro.sunset}
                      </span>
                      {responseForecast.current.is_day === 0 ? (
                        <WiMoonrise className="text-2xl" />
                      ) : (
                        <BsSunset className="text-2xl" />
                      )}
                    </span>
                  </div>
                </div>
                <div
                  id="hourlyCast"
                  key={item.date}
                  className="py-1 px-2 border-y-2"
                >
                  <div
                    className="py-1 flex gap-5 xs:gap-8 sm:gap-10 overflow-x-scroll"
                    key={item.date}
                  >
                    {item.hour.map((hour) => (
                      <div key={hour.time} className="flex flex-col gap-2">
                        <div>{hour.time.slice(-5)}</div>
                        <img
                          className="w-10 h-10"
                          src={hour.condition.icon}
                        ></img>
                        <div className="flex items-end gap-1">
                          <span className="text-2xl">{hour.temp_c} </span>
                          <span className="m-0">°C</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div id="extraInfo" className="grid grid-cols-3 sm:grid-cols-6">
                  <button
                    name="avgWindSpeed"
                    onClick={changeUnit}
                    className="justify-self-center mt-4 p-1 w-24 h-24 border rounded-3xl hover:bg-blue-400 hover:cursor-pointer ease-in-out duration-300"
                  >
                    <TbWind className="text-2xl mb-2" />
                    <span className="mr-1 cursor-pointer">
                      {`${(
                        item.hour
                          .map((item) =>
                            distanceUnit ? item.wind_kph : item.wind_mph
                          )
                          .reduce((cur, sum) => cur + sum, 0) / 24
                      ).toFixed(2)} ${distanceUnit ? "kph" : "mph"}`}
                    </span>
                  </button>
                  <button
                    name="humidity"
                    className="justify-self-center mt-4 p-1 w-24 h-24 border rounded-3xl cursor-auto"
                  >
                    <BsDroplet className="text-2xl mb-2" />
                    <span>{item.day.avghumidity} %</span>
                  </button>
                  <button
                    name="avgPressure"
                    className="justify-self-center mt-4 p-1 w-24 h-24 border rounded-3xl cursor-auto"
                  >
                    <TbGauge className="text-2xl mb-2" />
                    <span className="mr-1">
                      {(
                        item.hour
                          .map((item) => item.pressure_mb)
                          .reduce((cur, sum) => cur + sum, 0) / 24
                      ).toFixed(0)}
                      mbar
                    </span>
                  </button>
                  <button
                    name="uvIndex"
                    className="justify-self-center mt-4 p-1 w-24 h-24 border rounded-3xl cursor-auto flex flex-col"
                  >
                    <span className="mb-2 font-black">UV</span>
                    <span className="mt-0">
                      {item.day.uv} mW/m
                      <span className="text-xs absolute">2</span>
                    </span>
                  </button>
                  <button
                    name="feelsLike"
                    className="justify-self-center mt-4 p-1 w-24 h-24 border rounded-3xl cursor-auto"
                  >
                    <span className="flex justify-center">
                      <TbTemperature className="text-2xl mb-2 mx-0" />
                      <span className="mx-0">
                        {item.hour
                          .map((item) => item.feelslike_c)
                          .reduce((cur, sum) => cur + sum, 0) /
                          24 >
                        item.day.avgtemp_c ? (
                          <ImArrowUp2 className="text-red-400" />
                        ) : (
                          <ImArrowDown2 className="text-blue-400" />
                        )}
                      </span>
                    </span>
                    <span className="mr-1">
                      {(
                        item.hour
                          .map((item) => item.feelslike_c)
                          .reduce((cur, sum) => cur + sum, 0) / 24
                      ).toFixed(1)}{" "}
                      °C
                    </span>
                  </button>
                  <button
                    name="rainChance"
                    className="justify-self-center mt-4 p-1 w-24 h-24 border rounded-3xl cursor-auto"
                  >
                    <span className="flex justify-center">
                      <BsCloudRain className="text-2xl mb-2 mx-0" />
                    </span>
                    <span>{item.day.daily_chance_of_rain} %</span>
                  </button>
                </div>
              </section>
            ))}
      </div>
    </div>
  );
};

export default DetailPage;
