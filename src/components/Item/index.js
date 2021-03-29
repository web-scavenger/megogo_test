import React from "react";
import PropTypes from "prop-types";

import { imageUrlCostructor } from "../../utils";

import "./styles.scss";

const propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
};

const defaultProps = {
  isActive: false,
  title: "image",
};

const Item = (props) => {
  const { id, isActive, title } = props;
  const imgUrl = imageUrlCostructor(props);

  return (
    <img
      key={id}
      src={imgUrl}
      className={`item ${isActive ? "active" : ""}`}
      alt={title}
    />
  );
};

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
