import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import SimpleReactLightbox from "simple-react-lightbox";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SimpleReactLightbox>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SimpleReactLightbox>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
