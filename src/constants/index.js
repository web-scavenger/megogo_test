export const FIRST_PAGE_PHOTOS_LIMIT = 51;
export const OTHER_PAGE_PHOTOS_LIMIT = 41;

export const USER_ERROR_MESSAGE =
  "Oops, something went wrong =( Refresh page or contact our support!";

export const FLICKR_METHOD = 'flickr.photos.search'
export const API_KEY = "bf19806fe97450164e7595f9efb366d7";
export const DEFAULT_TEXT = "panda";
export const DEFAULT_PAGE_NUMBER = "0";
export const SIZE_SUFFIX = "n"; 
export const ROW_LIMIT = 5;

export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export const START_IMAGE_POSTION = 2; // position of active item on page initialization

export const HANDLE_SCROLL_DEBOUNCE = 150;

// mapping use for handleKeyPress to call correct event
export const KEYS_MAP = {
  UP: {
    key: "ArrowUp",
    keyCode: 38,
  },
  DOWN: {
    key: "ArrowDown",
    keyCode: 40,
  },
  LEFT: {
    key: "ArrowLeft",
    keyCode: 37,
  },
  RIGHT: {
    key: "ArrowRight",
    keyCode: 39,
  },
};
