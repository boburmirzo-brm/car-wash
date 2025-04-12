import { Avatar } from "antd";
import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useCheckTokenQuery } from "@/redux/api/auth";

const DashboardHeader = () => {
   const { data } = useCheckTokenQuery(undefined);
  return (
    <div className="w-full h-[60px] border-b sticky top-0 left-0 z-50 bg-white border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 ">
        <Avatar>{data?.user?.f_name?.charAt(0)}</Avatar>
        <h2>{data?.user?.f_name}</h2>
      </div>
      <Avatar
        className="cursor-pointer"
        onClick={() => window.location.reload()}
        icon={<ReloadOutlined />}
      />
    </div>
  );
};

export default React.memo(DashboardHeader);
