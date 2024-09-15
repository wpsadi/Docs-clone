import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRouter from "./Router/CustomRouter";

import ZustandWrap from "./zustandWrapper/ZustandWrap";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster />
        <ZustandWrap />
        <CustomRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
