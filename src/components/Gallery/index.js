import React, { useContext } from "react";

import { PhotosContext } from "../../contexts";
import { useEventListener } from "../../hooks";
import { ItemsRow, Loader, Error } from "../index";
import { getCurrentBrowserScrollEventName } from "../../utils";

import "./styles.scss";

const Gallery = () => {
  const context = useContext(PhotosContext);
  const { handleKeyPress, handleScroll, photosRow, loading, error } = context;
  const scrollEventName = getCurrentBrowserScrollEventName();

  useEventListener(scrollEventName, handleScroll);
  useEventListener("keydown", handleKeyPress);

  return (
    <>
      <Loader isLoading={loading} />
      <div className="container">
        {Object.entries(photosRow).map(([level, photos], index) => {
          return (
            <ItemsRow
              photos={photos}
              checkForActive={level === "middle"}
              key={index}
            />
          );
        })}
      </div>
      <Error isError={error} />
    </>
  );
};

export default Gallery;
