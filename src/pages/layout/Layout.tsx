import React, { useEffect } from "react";
import BottomNavigation from "@/components/bottom-navigation/BottomNavigation";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { useCheckTokenQuery } from "../../redux/api/auth";
import { setRole } from "../../redux/features/role.slice";
import { Role } from "../../components/edit-profile/EditProfile";

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

  if (isLoading) return <div>Loading...</div>;

  const isAdminOrOwner = roleState === Role.ADMIN || roleState === Role.OWNER;

  return (
    <div className={isAdminOrOwner ? "flex" : "bg-[#fdfdfd]"}>
      {isAdminOrOwner ? <Sidebar role={roleState}/> : <Header />}
      <main
        className={
          isAdminOrOwner ? "flex-1 p-4" : `container mx-auto min-h-[80vh] pb-[60px]`
        }
      >
        <Outlet />
      </main>
      {isAdminOrOwner ? null : <BottomNavigation />}
    </div>
  );
};

export default React.memo(Layout);
