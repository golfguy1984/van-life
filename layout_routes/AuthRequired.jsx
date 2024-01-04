import React from "react";
import { Outlet, Navigate, useOutletContext } from "react-router-dom";

function AuthRequired() {
  let context = useOutletContext();

  if (!context.user) {
    return (
      <Navigate
        to="/Login"
        state={{ message: "You must log in first" }}
        replace
      />
    );
  }

  return context && <Outlet />;
}

export default AuthRequired;
