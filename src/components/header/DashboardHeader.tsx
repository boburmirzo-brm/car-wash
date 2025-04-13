import { Avatar } from "antd";
import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useCheckTokenQuery } from "@/redux/api/auth";
import FullScreen from "./FullScreen";
import ThemeMode from "./ThemeMode";

const DashboardHeader = () => {
  const { data } = useCheckTokenQuery(undefined);

  return (
    <div className="w-full h-[60px] border-b sticky top-0 left-0 z-50 bg-sidebar text-text border-border px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 ">
        <Avatar>{data?.user?.f_name?.charAt(0)}</Avatar>
        <h2>{data?.user?.f_name}</h2>
      </div>
      <div className="flex gap-2">
        <FullScreen />
        <ThemeMode />
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
