import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

function ProtectedRoutes({ path, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
}

export default ProtectedRoutes;
