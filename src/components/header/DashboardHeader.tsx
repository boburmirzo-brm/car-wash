import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useCheckTokenQuery } from "@/redux/api/auth";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import FullScreen from "./FullScreen";

const DashboardHeader = () => {
  const { data } = useCheckTokenQuery(undefined);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const handleChangeTheme = () => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };


  return (
    <div className="w-full h-[60px] border-b sticky top-0 left-0 z-50 bg-sidebar text-text border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 ">
        <Avatar>{data?.user?.f_name?.charAt(0)}</Avatar>
        <h2>{data?.user?.f_name}</h2>
      </div>
      <div className="flex gap-2">
        <FullScreen/>
        <button
          className="cursor-pointer flex justify-center items-center hover:bg-bg size-8 rounded-full  text-text-muted"
          onClick={handleChangeTheme}
        >
          {theme === "dark" ? <FaRegSun /> : <FaRegMoon />}
        </button>
        <button
          className="cursor-pointer  size-8 rounded-full hover:bg-bg text-text-muted"
          onClick={() => window.location.reload()}
        >
          <ReloadOutlined />
        </button>
      </div>
    </div>
  );
};

export default React.memo(DashboardHeader);
