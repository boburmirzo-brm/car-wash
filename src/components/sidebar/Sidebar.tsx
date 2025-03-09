import { useCheckTokenQuery } from "@/redux/api/auth";
import { Avatar, Button, Popconfirm } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import {
  MdLogout,
  MdOutlineAdminPanelSettings,
  MdOutlineDashboard,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth.slice";

const Sidebar: React.FC = () => {
  const { data } = useCheckTokenQuery(undefined);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="w-[250px] h-screen overflow-auto flex flex-col text-primary p-4 bg-white border-r border-gray-200 sticky top-0 left-0">
      <div className="flex items-center gap-2">
        <Avatar>{data?.user?.f_name?.charAt(0)}</Avatar>
        <h2>{data?.user?.f_name}</h2>
      </div>
      <ul className="my-10 space-y-2 flex-1">
        <li>
          <NavLink
            to={"/"}
            className="flex items-center gap-2 py-2 hover:bg-gray-100 px-2 rounded-md sidebar-link"
          >
            <MdOutlineDashboard className="text-2xl" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/admins"}
            className="flex items-center gap-2 py-2 hover:bg-gray-100 px-2 rounded-md sidebar-link"
          >
            <MdOutlineAdminPanelSettings className="text-2xl" />
            <span>Adminlar</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/employees"}
            className="flex items-center gap-2 py-2 hover:bg-gray-100 px-2 rounded-md sidebar-link"
          >
            <FaRegUserCircle className="text-2xl" />
            <span>Ishchilar</span>
          </NavLink>
        </li>
      </ul>
      <Popconfirm
        title="Tizimdan chiqish"
        description="Chindan ham tizimdan chiqmoqchimisiz"
        onConfirm={handleLogout}
        okText="Ha"
        cancelText="Yo'q"
      >
        <Button type="default">
          <MdLogout className="text-lg" />
          <span>Log out</span>
        </Button>
      </Popconfirm>
    </div>
  );
};

export default React.memo(Sidebar);
