import React from "react";
import { PhotosProvider } from "./contexts";
import { Gallery } from "./components";
const App = () => {
  return (
    <PhotosProvider>
      <Gallery />
    </PhotosProvider>
  );
};

export default App;
