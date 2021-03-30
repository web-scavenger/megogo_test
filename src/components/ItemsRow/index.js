import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'

import { Item } from "../index";
import { PhotosContext } from "../../contexts";

import "./styles.scss";

const propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    owner: PropTypes.string,
    secret: PropTypes.string,
    server: PropTypes.string,
    title: PropTypes.string,
  }).isRequired),
  checkForActive: PropTypes.bool, 
  isShown: PropTypes.bool, 
  dataIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
}

const defaultProps = {
  checkForActive: false,
  isShown: false,
  dataIndex: null,
}

const ItemsRow = ({ photos, checkForActive, isShown, dataIndex }) => {
  const { currentPhotoPosition } = useContext(PhotosContext);
  const [elementIndex, setElementIndex] = useState(null)

  useEffect(() => {
    // use setTimeout for more smoothly animation
    setTimeout(() => {
      setElementIndex(dataIndex)
    }, 50);
  }, [dataIndex])

  return (
    <div className={`items-row__container ${isShown ? 'shown': ''}`} data-index={elementIndex}>
      {photos.map((photo, index) => (
        <Item
          {...photo}
          isActive={checkForActive && index === currentPhotoPosition}
          key={photo.id}
        />
      ))}
    </div>
  );
};

ItemsRow.propTypes = propTypes;
ItemsRow.defaultProps = defaultProps;


export default ItemsRow;
