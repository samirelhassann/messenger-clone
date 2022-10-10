import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./Home/Home";

const MainRoutes = () => {
  return useRoutes([{ path: "*", element: <Home /> }]);
};

export default MainRoutes;
