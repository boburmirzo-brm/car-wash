import BottomNavigation from "@/components/bottom-navigation/BottomNavigation";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto min-h-[80vh]">
        <Outlet />
      </main>
      <BottomNavigation/>
    </>
  );
};

export default Layout;
