import { useCheckTokenQuery } from "@/redux/api/auth";
import { Avatar, Button, Popconfirm } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth.slice";
import { SIDEBAR_LINKS } from "@/static";

interface Props {
  onClose: () => void;
  open: boolean;
}

const Sidebar: React.FC<Props> = ({ open, onClose }) => {
  const { data } = useCheckTokenQuery(undefined);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isActive =
    pathname === "/" ||
    pathname === "/car-washing-done" ||
    pathname.startsWith("/customer/") ||
    pathname.startsWith("/car/");

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="sidebar-overlay fixed top-0 left-0 w-screen h-screen bg-black opacity-10 z-[51]"
        ></div>
      )}
      <div
        className={`${
          open ? "show" : ""
        } sidebar w-[250px] h-screen overflow-auto flex flex-col text-primary p-4 bg-white border-r border-gray-200 sticky top-0 left-0  z-[52]`}
      >
        <div className="flex items-center gap-2 ">
          <Avatar>{data?.user?.f_name?.charAt(0)}</Avatar>
          <h2>{data?.user?.f_name}</h2>
        </div>
        <ul className="my-10 space-y-2 flex-1">
          {SIDEBAR_LINKS?.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                onClick={onClose}
                end={false}
                className={`${
                  link.path === "/" && isActive ? "active" : ""
                } flex items-center gap-2 py-2 hover:bg-gray-100 px-2 rounded-md sidebar-link`}
              >
                {link.icon}
                <span>{link.title}</span>
              </NavLink>
            </li>
          ))}
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
    </>
  );
};

export default React.memo(Sidebar);
