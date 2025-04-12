import React from "react";
import { Avatar } from "antd";
// import logo from "@/assets/images/pwa-192x192.png"
import { Link } from "react-router-dom";
import { ReloadOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 left-0 z-40">
      <div className="container mx-auto">
        <nav className="h-[60px] max-[500px]:h-[50px] flex items-center justify-between">
          <Link to={"/EMPLOYEE"} className="text-primary font-bold">
            {/* <img className="w-[50px]" src={logo} alt="logo" /> */}
            <span className="font-bold text-xl">AvtoLeader</span>
          </Link>
          <Avatar className="cursor-pointer" onClick={() => window.location.reload()} icon={<ReloadOutlined />} />
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);
