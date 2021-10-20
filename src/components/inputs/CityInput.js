import React from "react";
import { Input, FormFeedback } from "reactstrap";
import PropTypes from "prop-types";

function CityInput(props) {
  const { state, setState, validateInput } = props;

  const onChangeCity = (e) => {
    e.preventDefault();

    const val = e.target.value;
    const [isValid, feedback] = validateInput(val);
    setState((prev) => ({
      ...prev,
      feedback,
      isValid,
      city: val,
    }));
  };

  return (
    <div>
      <Input
        placeholder='city... '
        type='text'
        name='username'
        value={state.city}
        onChange={onChangeCity}
        invalid={!state.isValid}
      />
      <FormFeedback style={{ display: "block" }}>
        {state.feedback ?? ""}
      </FormFeedback>
    </div>
  );
}

CityInput.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  validateInput: PropTypes.func.isRequired,
};

export default CityInput;
