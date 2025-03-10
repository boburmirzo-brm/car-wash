import { Avatar } from "antd";
import React from "react";
import { ReloadOutlined } from "@ant-design/icons";

const DashboardHeader = () => {
  return (
    <div className="w-full h-[60px] border-b bg-white border-gray-200 px-4 flex items-center justify-between">
      <p className="font-bold">Dashboard</p>
      <Avatar
        className="cursor-pointer"
        onClick={() => window.location.reload()}
        icon={<ReloadOutlined />}
      />
    </div>
  );
};

export default React.memo(DashboardHeader);
