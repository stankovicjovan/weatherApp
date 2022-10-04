import WeatherContext from "../context/WeatherContext";
import { useContext } from "react";
import { GoLocation } from "react-icons/go";

const MainPage = () => {
  const { responseForecast, errorForecast, loadingForecast } =
    useContext(WeatherContext);

  return (
    <div className="container bg-blue-500 h-screen">
      {loadingForecast && (
        <h1 className="text-center pt-48 text-4xl">LoadingForecast...</h1>
      )}
      {!loadingForecast && errorForecast && (
        <p className="text-red mx-auto pt-1/2">{errorForecast}</p>
      )}
      {!loadingForecast && !errorForecast && responseForecast?.location && (
        <section className="p-4">
          <span className="flex pt-16 gap-2 justify-center text-center text-3xl">
            <h1>{responseForecast?.location?.name}</h1>
            <span className="mr-0 ml-4">
              <GoLocation />
            </span>
          </span>
          <div className="flex flex-col align-center mt-8">
            <div className="text-8xl">
              {responseForecast?.current?.temp_c}
              <span className="ml-4 text-6xl">°C</span>
            </div>
            <div className=" mt-4 pb-8 flex justify-center gap-4 border-b border-blue-300 w-full">
              <div className="text-xl mx-0">
                {responseForecast?.forecast?.forecastday[0]?.day?.mintemp_c}
                <span className="ml-1">°C</span>
              </div>
              <span className="mx-0">/</span>
              <div className="text-xl mx-0">
                {responseForecast?.forecast?.forecastday[0]?.day?.maxtemp_c}
                <span className="ml-1">°C</span>
              </div>
            </div>
            <div className="mt-5 flex gap-2 justify-evenly w-full">
              {responseForecast?.forecast?.forecastday.slice(1).map((item) => (
                <div className="flex flex-col items-center m-0 p-2 xs:p-4  border border-blue-300 rounded-md hover:bg-blue-400 hover:cursor-pointer ease-in-out duration-300">
                  <span className="pb-2 mb-2 border-b border-blue-300 w-full text-center hover:cursor-pointer">
                    {item.date.slice(5)}
                  </span>
                  <div className="text-lg xs:text-xl pb-2">
                    {item.day.maxtemp_c}
                    <span className="xs:ml-1 text-sm">°C</span>
                  </div>
                  <div className="text-lg xs:text-xl">
                    {item.day.mintemp_c}
                    <span className="xs:ml-1 text-sm">°C</span>
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
