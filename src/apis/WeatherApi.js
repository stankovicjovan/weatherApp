import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";

const API_KEY = "0a7aacb7865243c89ab191901222909";
const BASE_URL = "https://api.weatherapi.com/v1/search.json?key=";

// const [latitude, longitude] = useGeolocation();
// let GET_LOCATION = `&q=${latitude},${longitude}`;
const GET_LOCATION = `&q=London`;

export default axios.create({
  baseURL: `${BASE_URL}${API_KEY}${GET_LOCATION}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
