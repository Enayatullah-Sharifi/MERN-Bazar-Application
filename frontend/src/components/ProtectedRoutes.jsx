import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

const ProtectedRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
