// import { RootState } from "@/redux";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const token = true //useSelector((state: RootState) => state.auth.access_token);
  return token ? <Outlet /> : <Navigate replace to={"/login"} />;
};

export default Auth;
