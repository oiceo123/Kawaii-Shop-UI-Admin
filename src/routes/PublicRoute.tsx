import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux";

const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return (
      <Route {...rest}>
        <Redirect to={"/?page=1&order_by=price&sort=ASC"} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default PublicRoute;
