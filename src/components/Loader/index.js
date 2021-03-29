import React from "react";
import PropTypes from "prop-types";

import logo from "./assets/logo.svg";

import "./styles.scss";

const propTypes = {
  isLoading: PropTypes.bool,
};

const defaultProps = {
  isLoading: false,
};

const Loader = ({ isLoading }) =>
  isLoading && (
    <div className="loader__container">
      <img src={logo} className="logo-spinner" alt="logo" />
    </div>
  );

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
