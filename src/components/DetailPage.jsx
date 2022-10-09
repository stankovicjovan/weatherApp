import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import WeatherContext from "../context/WeatherContext";
import { GoLocation } from "react-icons/go";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { WiMoonset, WiMoonrise } from "react-icons/wi";
import "../App.css";

const DetailPage = () => {
  const { responseForecast, errorForecast, loadingForecast } =
    useContext(WeatherContext);

  const location = useLocation();
  const queryDate = location.pathname.slice(-10);

  const currentTime = new Date().toLocaleTimeString().slice(0, 2).includes(":")
    ? `0${new Date().toLocaleTimeString().slice(0, 4)}`
    : new Date().toLocaleTimeString().slice(0, 5);

  console.log(new Date().getTime());

  const beforeMidday =
    new Date().toLocaleTimeString().slice(-2) === "AM" ? true : false;

  return (
    <div className="container bg-blue-500 h-screen p-2 sm:p-4">
      {loadingForecast && (
        <h1 className="text-center pt-48 text-4xl">LoadingForecast...</h1>
      )}
      {!loadingForecast && errorForecast && (
        <p className="text-red mx-auto pt-1/2">{errorForecast}</p>
      )}
      <div className="pt-16">
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
                      src={responseForecast?.current?.condition?.icon}
                      alt=""
                    />
                    <h1>{responseForecast?.location?.name}</h1>
                    <span className="mr-0 ml-2">
                      <GoLocation />
                    </span>
                  </span>
                  <div className="text-6xl hover:cursor-pointer mb-3">
                    {responseForecast?.current.temp_c}
                    <span className="ml-4 text-4xl hover:cursor-pointer">
                      °C
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex gap-2">
                      {beforeMidday &&
                      currentTime < item.astro.sunrise.slice(0, 5) ? (
                        <WiMoonset className="text-2xl" />
                      ) : !beforeMidday && currentTime > item.astro.sunset ? (
                        <BsSunrise className="text-2xl" />
                      ) : (
                        <WiMoonset className="text-2xl" />
                      )}
                      <span className="text-lg">
                        {beforeMidday &&
                        currentTime < item.astro.sunrise.slice(0, 5)
                          ? item.astro.moonset
                          : !beforeMidday && currentTime > item.astro.sunset
                          ? item.astro.sunrise
                          : item.astro.moonset}
                      </span>
                    </span>
                    —
                    <span className="flex gap-2">
                      <span className="text-lg">
                        {beforeMidday &&
                        currentTime < item.astro.sunrise.slice(0, 5)
                          ? item.astro.moonrise
                          : !beforeMidday && currentTime > item.astro.sunset
                          ? item.astro.sunset
                          : item.astro.moonrise}
                      </span>
                      {beforeMidday &&
                      currentTime < item.astro.sunrise.slice(0, 5) ? (
                        <WiMoonrise className="text-2xl" />
                      ) : !beforeMidday && currentTime > item.astro.sunset ? (
                        <BsSunset className="text-2xl" />
                      ) : (
                        <WiMoonrise className="text-2xl" />
                      )}
                    </span>
                  </div>
                </div>
                <div key={item.date} className="py-1 px-2 border-y-2">
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
              </section>
            ))}
      </div>
    </div>
  );
};

export default DetailPage;
