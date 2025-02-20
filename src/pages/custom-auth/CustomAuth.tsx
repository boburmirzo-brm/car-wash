import { RootState } from "@/redux";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  role: string,
  to: string
}
const CustomAuth: FC<Props> = ({role,to}) => {
  const roleState = useSelector((state: RootState) => state.role.value);
  return roleState === role ? <Outlet /> : <Navigate replace to={to} />;
};

export default React.memo(CustomAuth);
