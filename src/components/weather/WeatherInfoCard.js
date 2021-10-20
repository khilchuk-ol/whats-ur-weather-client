import PropTypes from "prop-types";
import { CardText, CardTitle } from "reactstrap";
import { Fragment } from "react";

function WeatherInfoCard(props) {
  const { city, temperature, windSpeed, humidity } = props;

  return (
    <Fragment>
      <CardTitle tag='h5'>Currently in {city}</CardTitle>
      <CardText>
        <p>
          <b>temperature, C: </b>
          {temperature}
          <br />
          <b>windSpeed, km/h: </b>
          {windSpeed}

          <br />
          <b>humidity, %: </b>
          {humidity}
        </p>
      </CardText>
    </Fragment>
  );
}

WeatherInfoCard.propTypes = {
  city: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
};

export default WeatherInfoCard;
