import { Button, Popconfirm } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth.slice";
import { SIDEBAR_LINKS } from "@/static";
import { RootState } from "@/redux";
import { Role } from "@/constant";

interface Props {
  onClose: () => void;
  open: boolean;
}

const Sidebar: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.role.value);

  const { pathname } = useLocation();
  const isActive =
    pathname === "/" ||
    pathname === "/car-washing-done" ||
    pathname.startsWith("/customer/") ||
    pathname.startsWith("/car/");

  const handleLogout = () => {
    dispatch(logout());
  };
  const hidedLinksList = ["/admins"];
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
        } sidebar w-[250px] h-screen overflow-auto flex flex-col text-primary p-4 bg-sidebar border-r border-border sticky top-0 left-0  z-[52]`}
      >
        <div className="font-bold text-text">AvtoLeader</div>
        <ul className="my-10 space-y-2 flex-1">
          {SIDEBAR_LINKS?.filter(
            (i) => role === Role.OWNER || !hidedLinksList.includes(i.path)
          )?.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                onClick={onClose}
                end={false}
                className={`${
                  link.path === "/" && isActive ? "active" : ""
                } flex items-center gap-2 py-2 hover:bg-bg px-2 text-text-muted rounded-md sidebar-link`}
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
