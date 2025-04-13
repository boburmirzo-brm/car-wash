import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";

const Header = () => {
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
    <header className="bg-sidebar border-b border-border sticky top-0 left-0 z-40">
      <div className="container mx-auto">
        <nav className="h-[60px] max-[500px]:h-[50px] flex items-center justify-between">
          <Link to={"/EMPLOYEE"} className=" font-bold">
            {/* <img className="w-[50px]" src={logo} alt="logo" /> */}
            <span className="font-bold text-xl">AvtoLeader</span>
          </Link>
          <div className="flex gap-2">
            <button
              className="cursor-pointer flex justify-center items-center border size-8 rounded-full border-border text-text-muted"
              onClick={handleChangeTheme}
            >
              {theme === "dark" ? <FaRegSun /> : <FaRegMoon />}
            </button>
            <button
              className="cursor-pointer border size-8 rounded-full border-border text-text-muted"
              onClick={() => window.location.reload()}
            >
              <ReloadOutlined />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);
