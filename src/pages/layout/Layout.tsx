import React, { useEffect } from "react";
import BottomNavigation from "@/components/bottom-navigation/BottomNavigation";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { useCheckTokenQuery } from "../../redux/api/auth";
import { setRole } from "../../redux/features/role.slice";
import { Role } from "@/constant";
import { Loading } from "@/utils";
import DashboardHeader from "@/components/header/DashboardHeader";

const Layout = () => {
  const dispatch = useDispatch();
  const roleState = useSelector((state: RootState) => state.role.value);
  const token = useSelector((state: RootState) => state.auth.access_token);
  // const token = localStorage.getItem("access_token");
  const { data, isLoading } = useCheckTokenQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    if (data?.user?.role) {
      dispatch(setRole(data.user.role));
    }
  }, [data]);

  const isAdminOrOwner = roleState === Role.ADMIN || roleState === Role.OWNER;

  return isLoading ? <Loading /> : (
    <div className={isAdminOrOwner ? "flex bg-[#f9f9f9]" : "bg-[#fdfdfd]"}>
      {isAdminOrOwner ? <Sidebar /> : <Header />}
      <main
        className={
          isAdminOrOwner
            ? "flex-1"
            : `container mx-auto min-h-[80vh] pb-[60px]`
        }
      >
        {isAdminOrOwner && <DashboardHeader />}
        <Outlet/>
      </main>
      {isAdminOrOwner ? null : <BottomNavigation />}
    </div>
  );
};

export default React.memo(Layout);
