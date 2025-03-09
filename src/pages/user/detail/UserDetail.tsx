import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { Role } from "@/constant";
import { useGetUserByIdQuery } from "@/redux/api/user";
import { Button, Skeleton, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { TbUser, TbUserX } from "react-icons/tb";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserByIdQuery(id!);
  console.log(data);
  const user = data?.data?.payload;
  return (
    <div className="p-4">
      <div className="shadow bg-white md:p-6 p-4 rounded-md border border-gray-100 w-full">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
            <div className="flex items-center  w-full  flex-row gap-3">
              <div>
                <TbUser className="text-7xl text-gray-600" />
              </div>
              <div className="w-full ">
                <h3 className="text-2xl font-medium">
                  {user?.f_name} {user?.l_name}
                </h3>
                <p className="text-gray-600 my-1">@{user.username}</p>
                <p className="text-gray-600 text-sm">{user.address}</p>
                {user?.role !== Role.ADMIN && (
                  <p className="text-gray-600 text-sm mt-3">
                    Ro'yhatdan o'tkazgan{" "}
                    <span className="text-black">
                      {user?.adminId?.l_name?.charAt(0)}.{" "}
                      {user?.adminId?.f_name}
                    </span>
                  </p>
                )}
               
                <Tooltip
                  placement="bottom"
                  title={user?.createdAt.timeFormat()}
                >
                  <span className="text-gray-600">
                    {user?.createdAt.dateFormat()}
                  </span>
                </Tooltip>
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-1.5">
              <Title
                level={3}
                type={
                  user.budget === 0
                    ? "secondary"
                    : (user?.budget || 0) > 0
                    ? "success"
                    : "danger"
                }
                style={{ marginBottom: 0 }}
              >
                {(user?.budget || 0)?.toLocaleString() || "0"} UZS
              </Title>
              <TelPopUp phoneNumber={user?.tel_primary || ""} />
              <TelPopUp phoneNumber={user?.tel_secondary || ""} />
              <div className="flex gap-1.5">
                <Button
                  // onClick={() => handleOpenModal("edit")}
                  type="default"
                >
                  <FaRegEdit className="text-lg" />
                  {/* <span>Tahrirlash</span> */}
                </Button>
                <Button
                  // onClick={() => handleOpenModal("payment")}
                  type="default"
                >
                  <MdAttachMoney className="text-lg" />
                  <span>To'lov</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserDetail);
