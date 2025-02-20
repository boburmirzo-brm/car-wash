// import { RootState } from "@/redux";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const DashboardAuth = () => {
  const role = "admin" //useSelector((state: RootState) => state.role.value);
  return role === "admin" ? <Outlet /> : <Navigate replace to={"/employer"} />;
};

export default DashboardAuth;
