import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

const propTypes = {
  isError: PropTypes.string,
};

const defaultProps = {
  isError: "",
};

const Error = ({ isError }) =>
  !!isError && (
    <div className="error__container">
      <p>{isError}</p>
    </div>
  );

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
