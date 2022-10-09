import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [geoLocationReady] = useGeolocation();

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
        setResponse(res.data);
      } catch (err) {
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
