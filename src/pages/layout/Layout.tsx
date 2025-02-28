import React, { useEffect } from "react";
import BottomNavigation from "@/components/bottom-navigation/BottomNavigation";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { useCheckTokenQuery } from "../../redux/api/auth";
import { setRole } from "../../redux/features/role.slice";

const Layout = () => {
  const dispatch = useDispatch();
  const roleState = useSelector((state: RootState) => state.role.value);
  const token = localStorage.getItem("access_token");
  const { data, error, isLoading } = useCheckTokenQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    if (data?.user?.role) {
      dispatch(setRole(data.user.role));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to fetch user role</div>;

  const isAdminOrOwner = roleState === "ADMIN" || roleState === "OWNER";

  return (
    <div className={isAdminOrOwner ? "flex" : "bg-[#fdfdfd]"}>
      {isAdminOrOwner ? <Sidebar /> : <Header />}
      <main
        className={
          isAdminOrOwner ? "flex-1 p-4" : `container mx-auto min-h-[80vh]`
        }
      >
        <Outlet />
      </main>
      {isAdminOrOwner ? null : <BottomNavigation />}
    </div>
  );
};

export default React.memo(Layout);
