import React, { useCallback, useState } from "react";
import { Typography, Tag, Button, Popconfirm, Skeleton, Alert } from "antd";
import { useCheckTokenQuery } from "@/redux/api/auth";
import UserPopup from "@/components/user-popup/UserPopup";
import { FaRegEdit } from "react-icons/fa";
import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth.slice";
import { TbUserShield } from "react-icons/tb";
import { useGetSalaryByIdQuery } from "@/redux/api/salary";
import { SalaryType } from "@/constant";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";

const { Title } = Typography;

const Profile = () => {
  const { data, isLoading } = useCheckTokenQuery();
  const { data: salary, isError } = useGetSalaryByIdQuery(data?.user?.id, {
    skip: !data?.user?.id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsEditing(false);

    if (!isBack) {
      window.history.back();
    }
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const user = data?.user || {};
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col gap-4 py-4 ">
      {isError && (
        <Alert
          message={"Oylik belgilanmagan. Avval oylikni belgilating"}
          style={{ width: "100%" }}
          type="error"
        />
      )}
      <Box>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
            <div className="flex w-full md:items-center flex-row-reverse md:flex-row gap-3">
              <div>
                <TbUserShield className="text-8xl text-gray-600" />
              </div>
              <div className="w-full ">
                <h3 className="text-2xl font-medium">{user.f_name}</h3>
                <h4 className="text-base">{user.l_name}</h4>
                <p className="text-gray-700 mt-2">@{user.username}</p>
                {/* <div className="mt-2">
                  <Tag
                    color={user.is_active ? "green" : "red"}
                    className="text-xs md:text-sm"
                  >
                    {user.is_active ? "Faol" : "Faol emas"}
                  </Tag>
                </div> */}
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-1.5">
              <Title
                level={3}
                type={
                  user.budget === 0
                    ? "secondary"
                    : user.budget > 0
                    ? "success"
                    : "danger"
                }
                style={{ marginBottom: 0 }}
              >
                {user.budget?.toLocaleString() || "0"} UZS
              </Title>
              {!isError && (
                <Tag
                  onClick={() => setIsShow(!isShow)}
                  color="green"
                  className="cursor-pointer"
                >
                  {isShow
                    ? `${salary?.data?.payload?.amount?.toLocaleString()}
                    ${
                      salary?.data?.payload?.type === SalaryType.PERCENT
                        ? "%"
                        : "so'm"
                    }`
                    : "****"}
                </Tag>
              )}
              <TelPopUp phoneNumber={user.tel_primary} />
              <div className="flex gap-1.5">
                <Button onClick={() => setIsEditing(true)} type="default">
                  <FaRegEdit className="text-lg" />
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
      <Tabs
        className=""
        items={[
          { title: "Ish", path: "/employee/profile", id: 0 },
          { title: "Maosh", path: "expense", id: 1 },
          { title: "Kirim", path: "payment", id: 2 },
        ]}
      />
      <div className="min-h-[500px]">
        <Outlet />
      </div>

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
