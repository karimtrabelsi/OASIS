import { Navigate } from "react-router-dom";
import useAuthStore from "../../utils/zustand";

export const RequireAuth = ({ children }) => {
  const { user } = useAuthStore();
  const isAuthenticated = localStorage.getItem("connectedUser") ? true : false;
  if (!user) {
    return <Navigate to="/page-login" />;
  }
  return children;
};
