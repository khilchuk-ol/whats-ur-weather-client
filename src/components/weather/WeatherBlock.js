import { ToastHeader, Toast, ToastBody, Button, Card, Alert } from "reactstrap";
import { useState, useCallback, useMemo } from "react";

import classes from "./WeatherBlock.module.css";
import CityInput from "../inputs/CityInput";
import weatherServices from "../../services/weather.service.js";
import Spinner from "../UI/Spinner.js";
import WeatherInfoCard from "./WeatherInfoCard.js";

function WeatherBlock(props) {
  const [cityState, setCityState] = useState({
    city: "",
    isValid: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    isReceivedOnce: false,
    weather: {
      temperature: 0,
      windSpeed: 0,
      humidity: 0,
    },
    error: null,
  });

  const validateCity = (val) => {
    if (!val.trim()) {
      return [false, "City name cannot be empty"];
    }

    if (!isNaN(val)) {
      return [false, "City name cannot be numeric"];
    }

    return [true, null];
  };

  const isBtnEnabled = cityState.isValid;

  const onWeatherGet = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoading(true);
      weatherServices
        .getCurrentWeather(cityState.city)
        .then((data) => {
          console.log(data);
          setIsLoading(false);

          setResponse({ weather: data, isReceivedOnce: true });
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);

          setResponse({ error: err.message, isReceivedOnce: true });
        });
    },
    [cityState.city]
  );

  const resElem = useMemo(
    () =>
      response.error ? (
        <Alert color='danger'>{response.error}</Alert>
      ) : (
        <WeatherInfoCard city={cityState.city} {...response.weather} />
      ),
    [response]
  );

  return (
    <div className={`p-3 my-2 rounded ${classes.block}`}>
      <Toast>
        <ToastHeader>Check the weather in any city</ToastHeader>
        <ToastBody>
          <CityInput
            validateInput={validateCity}
            state={cityState}
            setState={setCityState}
          />
          <Button
            color='secondary'
            className={`${classes.btn}`}
            disabled={!isBtnEnabled}
            onClick={onWeatherGet}>
            Get weather
          </Button>

          {response.isReceivedOnce && (
            <Card body className='text-center'>
              {isLoading ? (
                <div className={classes.block}>
                  <Spinner />{" "}
                </div>
              ) : (
                resElem
              )}
            </Card>
          )}
        </ToastBody>
      </Toast>
    </div>
  );
}

export default WeatherBlock;
