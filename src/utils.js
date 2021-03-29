import {
  OTHER_PAGE_PHOTOS_LIMIT,
  FIRST_PAGE_PHOTOS_LIMIT,
  API_KEY,
  DEFAULT_TEXT,
  SIZE_SUFFIX,
  FLICKR_METHOD,
} from "./constants";

const fetchData = async (url) => {
  const response = await fetch(url);

  return new Promise(async (resolve, reject) => {
    if (response.ok) {
      const json = await response.json();
      resolve(json);
    }
    reject(response.status);
  });
};

export const getImageList = async (
  pageNumber = FIRST_PAGE_PHOTOS_LIMIT,
  perPage
) => {
  const url = `https://www.flickr.com/services/rest/?method=${FLICKR_METHOD}&api_key=${API_KEY}&text=${DEFAULT_TEXT}&per_page=${perPage}&page=${pageNumber}&format=json&nojsoncallback=1`;
  const { photos } = await fetchData(url);

  return photos;
};

export const imageUrlCostructor = ({ server = "", id = "", secret = "" }) =>
  `https://live.staticflickr.com/${server}/${id}_${secret}_${SIZE_SUFFIX}.jpg`;

export const getPageInfo = (pageData) => {
  const page = pageData?.page + 1 || 1;
  const perPage =
    page === 1 ? FIRST_PAGE_PHOTOS_LIMIT : OTHER_PAGE_PHOTOS_LIMIT;

  return { perPage, page };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getCurrentBrowserScrollEventName = () => {
  const isSupported = window && window.addEventListener;

  if (!isSupported) return null

  if ("onwheel" in document) {
    // IE9+, FF17+, Ch31+
    return 'wheel'
  } else if ("onmousewheel" in document) {
    // old event variant
    return "mousewheel";
  } else {
    // Firefox < 17
    return "MozMousePixelScroll";
  }
}
