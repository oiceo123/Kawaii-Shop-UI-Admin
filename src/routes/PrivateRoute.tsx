import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
