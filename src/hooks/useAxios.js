import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  // getting geolocation and making condition to see if we get actual data
  const [latitude, longitude] = useGeolocation();
  const geoLocationReady = latitude && longitude ? true : false;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });

        console.log(res);
        setResponse(res.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // fetch data based on weather we get geoLocation or not
    if (geoLocationReady) fetchData();
    // cleanup
    return () => controller.abort();
    // dependency can be url or geoLocationReady
  }, [url]);

  return [response, error, loading];
};

export default useAxios;
