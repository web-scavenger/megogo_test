import React from "react";
import { PhotosProvider } from "./contexts";
import { Gallery } from "./components";

console.log('=> document', document.body.style); // eslint-disable-line no-console
const App = () => {
  return (
    <PhotosProvider>
      <Gallery />
    </PhotosProvider>
  );
};

export default App;
