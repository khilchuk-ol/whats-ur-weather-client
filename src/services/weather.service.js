import axios from "axios";

const API_URL = "http://localhost:8080/weather/";

const getCurrentWeather = async (city) => {
  return axios
    .get(API_URL + `current?city=${city}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw new Error(
        err.message ??
          "Something went wrong during sending request to the server"
      );
    });
};

const services = {
  getCurrentWeather,
};

export default services;
