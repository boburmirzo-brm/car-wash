import React from "react";
import BottomNavigation from "@/components/bottom-navigation/BottomNavigation";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Sidebar from "@/components/sidebar/Sidebar";

const Layout = () => {
  const roleState = useSelector((state: RootState) => state.role.value);

  return (
    <div className={roleState === "admin" ? "flex" : "bg-[#fdfdfd]"}>
      {roleState === "admin" ? <Sidebar /> : <Header />}
      <main
        className={
          roleState === "admin"
            ? "flex-1 p-4"
            : `container mx-auto min-h-[80vh]`
        }
      >
        <Outlet />
      </main>
      {roleState === "admin" ? <></> : <BottomNavigation />}
    </div>
  );
};

export default React.memo(Layout);
