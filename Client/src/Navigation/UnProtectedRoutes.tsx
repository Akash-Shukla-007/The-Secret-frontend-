import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UnProtectedRoutes() {
  var token = localStorage.getItem("loginToken");
  if (token) {
    return <Navigate to="/default" replace />;
  } else {
    return <Outlet />;
  }
}

export default UnProtectedRoutes;
