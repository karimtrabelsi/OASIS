import { Redirect } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("connectedUser") ? true : false;
  if (!isAuthenticated) {
    return <Redirect to="/page-login" />;
  }
  return children;
};
