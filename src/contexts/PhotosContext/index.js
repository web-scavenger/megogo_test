import React, { createContext, useState, useEffect, useCallback } from "react";

import {
  FIRST_PAGE_PHOTOS_LIMIT,
  ROW_LIMIT,
  INCREASE,
  DECREASE,
  START,
  HANDLE_SCROLL_DEBOUNCE,
  KEYS_MAP,
  USER_ERROR_MESSAGE,
  START_IMAGE_POSTION,
} from "../../constants";
import { getImageList, getPageInfo, debounce } from "../../utils";

const { UP, DOWN, LEFT, RIGHT } = KEYS_MAP;

export const PhotosContext = createContext(null);

const PhotosProvider = ({ children }) => {
  const [photosList, setPhotosList] = useState([]); // array that contains all photo data that we get from API
  const [pageData, setPageData] = useState({}); // all other data that API resolve. PageNumber, all Pages at current query, , elements per page
  const [photosRow, setPhotosRow] = useState([]); // object that contain photo lists at three levels {top: [], middle: [], bottom: []}
  const [rowData, setRowData] = useState({}); // current active row and last act that we did. { rowNumber : number, act: enum(INCREASE , DECREASE, START)}
  const [currentPhotoPosition, setCurrentPhotoPosition] = useState(); // active Photo/Item position in row
  const [loading, setLoading] = useState(false); // loading state while we waiting for response
  const [error, setError] = useState(null); // error state. show when we have API error

  // return UI limits for photo list levels
  const countRowsLimits = () => {
    const { rowNumber = 1 } = rowData;
    const end = rowNumber * ROW_LIMIT;
    const start = end - ROW_LIMIT;
    const bottomEnd = end + ROW_LIMIT;

    // get new part of photo list if we are on penult row
    if (photosList.length && !loading && bottomEnd >= photosList.length) {
      getImages();
    }

    return { end, start, bottomEnd };
  };

  // use this method for initialize list or when we got start of list
  const startRowList = () => {
    const { end, start, bottomEnd } = countRowsLimits();
    const top = [];
    const middle = photosList.slice(start, end);
    const bottom = photosList.slice(end, bottomEnd);

    setPhotosRow([top, middle, bottom]);
  };

  const increaseRowCounter = async () => {
    const { rowNumber } = rowData;
    if (rowNumber !== photosRow.length - 1) return;

    const { end, bottomEnd } = countRowsLimits();

    const newBottom = photosList.slice(end, bottomEnd);

    setPhotosRow([...photosRow, newBottom]);
  };

  const getImagesRowList = () => {
    const { act } = rowData;

    if (act === INCREASE) {
      return increaseRowCounter();
    } else if( act === START){
      return startRowList();
    }

  };

  const getImages = async () => {
    if (!loading) {
      setLoading(true);

      try {
        const { page, perPage } = getPageInfo(pageData);
        const { photo, ...data } = await getImageList(page, perPage);
        /*
          sometimes Flickr API return array length perPage value, but sometimes perPage - 1.
          that`s why I cut array for one template
        */
        const cuttedPhotoList = photo.slice(0, perPage - 1);
        setPhotosList([...photosList, ...cuttedPhotoList]);
        setPageData(data);
      } catch (e) {
        setError(USER_ERROR_MESSAGE);
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const arrowRight = useCallback(() => {
    setCurrentPhotoPosition((currentPhotoPosition) => {
      if (currentPhotoPosition < ROW_LIMIT - 1) {
        return currentPhotoPosition + 1;
      }
      return currentPhotoPosition;
    });
  }, []);

  const arrowLeft = useCallback(() => {
    setCurrentPhotoPosition((currentPhotoPosition) => {
      if (currentPhotoPosition > 0) {
        return currentPhotoPosition - 1;
      }

      return currentPhotoPosition;
    });
  }, []);

  const arrowDown = useCallback(() => {
    setRowData((row) => {
      const { rowNumber } = row;
      const end = rowNumber * ROW_LIMIT;
      if (end <= photosList.length) {
        return {
          act: INCREASE,
          rowNumber: rowNumber + 1,
        };
      }

      return row;
    });
  }, [photosList]);

  const arrowUp = useCallback(() => {
    setRowData((row) => {
      const { rowNumber } = row;
      if (rowNumber > 1) {
        return {
          act: DECREASE,
          rowNumber: rowNumber - 1,
        };
      }

      return row;
    });
  }, []);

  const handleKeyPress = useCallback(
    ({ key, keyCode }) => {
      // pause while we wait for response from Flickr API
      if (!loading) {
        if (key === LEFT.key || keyCode === LEFT.keyCode) {
          arrowLeft();
        } else if (key === RIGHT.key || keyCode === RIGHT.keyCode) {
          arrowRight();
        } else if (key === DOWN.key || keyCode === DOWN.keyCode) {
          arrowDown();
        } else if (key === UP.key || keyCode === UP.keyCode) {
          arrowUp();
        }
      }
    },
    [loading]
  );

  const handleScroll = useCallback(
    debounce((e) => {
      const delta = e.deltaY || e.detail || e.wheelDelta;

      // pause while we wait for response from Flickr API
      if (!loading) {
        if (delta > 0) {
          arrowDown();
        } else if (delta < 0) {
          arrowUp();
        }
      }
    }, HANDLE_SCROLL_DEBOUNCE),
    [loading]
  );

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (photosList.length === FIRST_PAGE_PHOTOS_LIMIT - 1) {
      setCurrentPhotoPosition(START_IMAGE_POSTION);
      setRowData({ rowNumber: 1, act: START });
    }
  }, [photosList]);

  useEffect(() => {
    getImagesRowList();
  }, [rowData]);

  return (
    <PhotosContext.Provider
      value={{
        pageData,
        photosRow,
        currentPhotoPosition,
        handleKeyPress,
        handleScroll,
        loading,
        error,
        rowData,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosProvider;
