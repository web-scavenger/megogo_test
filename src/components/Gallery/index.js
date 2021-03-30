import React, { useCallback, useContext, useEffect, useState } from "react";

import { PhotosContext } from "../../contexts";
import { useEventListener } from "../../hooks";
import { ItemsRow, Loader, Error } from "../index";
import { getCurrentBrowserScrollEventName } from "../../utils";

import "./styles.scss";

const Gallery = () => {
  const context = useContext(PhotosContext);
  const [shownArr, setShownArr] = useState([0, 1, 2]);
  const {
    handleKeyPress,
    handleScroll,
    photosRow,
    loading,
    error,
    rowData: { rowNumber, act },
  } = context;

  const scrollEventName = getCurrentBrowserScrollEventName();

  useEventListener(scrollEventName, handleScroll);
  useEventListener("keydown", handleKeyPress);

  const getElementsList = useCallback((rowNumber) => {
    return [rowNumber - 1, rowNumber, rowNumber + 1];
  }, []);

  useEffect(() => {
    if (!!act) {
      setShownArr(getElementsList(rowNumber));
    }
  }, [act, rowNumber]);

  return (
    <>
      <Loader isLoading={loading} />
      <div className="container">
        {photosRow.map((photos, index) => {
          const isInclude = shownArr.includes(index);
          return (
            <ItemsRow
              photos={photos}
              checkForActive={index === rowNumber}
              key={index}
              isShown={isInclude}
              dataIndex={isInclude ? shownArr.indexOf(index) : null}
            />
          );
        })}
      </div>
      <Error isError={error} />
    </>
  );
};

export default Gallery;
