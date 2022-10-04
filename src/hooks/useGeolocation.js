import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const geoLocationReady = latitude && longitude ? true : false;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [latitude, longitude]);

  return [latitude, longitude, geoLocationReady];
};

export default useGeolocation;
