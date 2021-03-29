import React, { useContext } from "react";

import { Item } from "../index";
import { PhotosContext } from "../../contexts";

import "./styles.scss";

const ItemsRow = ({ photos, checkForActive }) => {
  const { currentPhotoPosition } = useContext(PhotosContext);

  return (
    <div className="items-row__container">
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
