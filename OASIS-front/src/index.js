import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import SimpleReactLightbox from "simple-react-lightbox";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById("root")
);
