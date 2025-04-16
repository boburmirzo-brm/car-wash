import React, { useCallback, useState } from "react";
import { Tag, Button, Popconfirm, Skeleton } from "antd";
import { useCheckTokenQuery } from "@/redux/api/auth";
import UserPopup from "@/components/user-popup/UserPopup";
import { FaRegEdit } from "react-icons/fa";
import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { MdLogout, MdOutlineAdminPanelSettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth.slice";
import Box from "@/components/ui/Box";
import { Role } from "@/constant";
import Tabs from "@/components/ui/Tabs";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const { data, isLoading } = useCheckTokenQuery();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsEditing(false);
    if (!isBack) {
      window.history.back();
    }
  }, []);

  const user = data?.user || {};

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-4">
      <Box>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
            <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
              <div>
                <MdOutlineAdminPanelSettings className="text-8xl text-text-muted" />
              </div>
              <div className="w-full ">
                <h3 className="text-2xl font-medium">{user.f_name}</h3>
                <h4 className="text-base">{user.l_name}</h4>
                <p className="text-text-muted mt-2">@{user.username}</p>
                <div className="mt-2">
                  <Tag
                    color={user.is_active ? "green" : "red"}
                    className="text-xs md:text-sm"
                  >
                    {user.is_active ? "Faol" : "Faol emas"}
                  </Tag>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-1.5">
              <TelPopUp phoneNumber={user.tel_primary} />
              <TelPopUp phoneNumber={user.tel_secondary} />
              <div className="flex gap-1.5">
                <Button onClick={() => setIsEditing(true)} type="default">
                  <FaRegEdit className="text-lg" />
                  {/* <span>Tahrirlash</span> */}
                </Button>
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
            </div>
          </div>
        )}
      </Box>
      {[Role.OWNER, Role.ADMIN].includes(user?.role) && (
        <>
          <Tabs
            className="mt-4"
            items={
              user?.role === Role.ADMIN
                ? [
                    {
                      title: "Maosh",
                      path: `/profile`,
                      id: 0,
                    },
                    {
                      title: "Chiqim",
                      path: `/profile/expense-history?filter=admin`,
                      id: 1,
                    },
                  ]
                : [
                    {
                      title: "Chiqim",
                      path: `/profile?filter=admin`,
                      id: 0, 
                    },
                  ]
            }
          />
          <div className="py-4 min-h-[500px]">
            <Outlet />
          </div>
        </>
      )}

      <UserPopup
        open={isEditing}
        onClose={handleClose}
        prevData={user}
        currentRole={user?.role}
      />
    </div>
  );
};

export default React.memo(Profile);
