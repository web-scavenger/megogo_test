import React, { useContext } from "react";

import { Item } from "../index";
import { PhotosContext } from "../../contexts";

import "./styles.scss";

const ItemsRow = ({ photos, checkForActive, isShown = false, dataIndex }) => {
  const { currentPhotoPosition } = useContext(PhotosContext);

  return (
    <div className={`items-row__container ${isShown ? 'shown': ''}`} data-index={dataIndex}>
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

export default ItemsRow;
