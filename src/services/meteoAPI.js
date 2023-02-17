import axios from "axios";

export const meteoAPI = axios.create({
  baseURL: "http://api.openweathermap.org/",
  timeout: 1000,
});
