import SalaryPopup from "@/components/salary-popup/SalaryPopup";
import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role, SalaryType } from "@/constant";
import { useGetSalaryByIdQuery } from "@/redux/api/salary";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/redux/api/user";
import { Alert, Button, Skeleton, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { MdAttachMoney, MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbUserShield } from "react-icons/tb";
import { NavLink, Outlet, useParams } from "react-router-dom";
import ExpensePopup from "../../../components/expense-popup/ExpensePopup";
import Options from "./Options";

type ModalType = "expense" | "edit" | "salary" | null;

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserByIdQuery(id!);
  const user = data?.data?.payload;
  const { data: salary, isError } = useGetSalaryByIdQuery(id!);
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setModalType(null);
    if (!isBack) window.history.back();
  }, []);

  const [updateUser] = useUpdateUserMutation();

  const handleToggleUserStatus = async () => {
    if (!id) return;

    try {
      await updateUser({
        id: id!,
        data: { is_active: !user?.is_active },
      }).unwrap();
    } catch (error) {
      console.error("Foydalanuvchi holatini o'zgartirishda xatolik:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="shadow bg-white md:p-6 p-4 rounded-md border border-gray-100 w-full relative">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            {isError && user?.role !== Role.ADMIN && (
              <Alert
                message={"Oylik belgilanmagan. Avval oylikni belgilang"}
                style={{ width: "100%" }}
                type="error"
              />
            )}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
              <div className="flex md:items-center flex-row-reverse w-full  md:flex-row gap-3">
                <div className="max-md:mt-8">
                  <TbUserShield className="text-7xl text-gray-600" />
                </div>
                <div className="w-full ">
                  <h3 className="text-2xl font-medium">
                    {user?.f_name} {user?.l_name}
                  </h3>
                  <p className="text-gray-600 my-1">@{user?.username}</p>
                  <p className="text-gray-600 text-sm">{user?.address}</p>
                  <Tag color={user?.is_active ? "green" : "red"}>
                    {user?.is_active ? "Faol" : "Ishdan bo'shatilgan"}
                  </Tag>
                  <br />
                  {user?.role !== Role.ADMIN && (
                    <p className="text-gray-600 text-sm mt-3 flex items-center gap-2">
                      <MdOutlineAdminPanelSettings />
                      <span>
                        {user?.adminId?.l_name?.charAt(0)}.{" "}
                        {user?.adminId?.f_name}
                      </span>
                    </p>
                  )}

                  <Tooltip
                    placement="bottom"
                    title={user?.createdAt.timeFormat()}
                  >
                    <span className="text-gray-600 text-sm">
                      {user?.createdAt.dateFormat()}
                    </span>
                  </Tooltip>
                </div>
              </div>

              <div className="flex w-full flex-col items-end gap-1.5 ">
                {user?.role !== Role.ADMIN && (
                  <div className="flex items-center">
                    <Title
                      level={3}
                      type={
                        user?.budget === 0
                          ? "secondary"
                          : (user?.budget || 0) > 0
                          ? "success"
                          : "danger"
                      }
                      style={{ marginBottom: 0 }}
                    >
                      {(user?.budget || 0)?.toLocaleString() || "0"} UZS
                    </Title>
                    <div className=" max-md:absolute top-4 right-4">
                      <Options
                        isActive={user?.is_active ?? false}
                        onToggleStatus={handleToggleUserStatus}
                        onEdit={() => handleOpenModal("edit")}
                        onSalary={() => handleOpenModal("salary")}
                        onExpense={() => handleOpenModal("expense")}
                      />
                    </div>
                  </div>
                )}
                {!isError && (
                  <div>
                    <Tag style={{ marginRight: 0 }} color="green">
                      {salary?.data?.payload?.amount?.toLocaleString()}{" "}
                      {salary?.data?.payload?.type === SalaryType.PERCENT
                        ? "%"
                        : "so'm"}
                    </Tag>
                  </div>
                )}
                <div>
                  <TelPopUp phoneNumber={user?.tel_primary || ""} />
                  <TelPopUp phoneNumber={user?.tel_secondary || ""} />
                </div>
                <Button
                  onClick={() => handleOpenModal("expense")}
                  type="default"
                >
                  <MdAttachMoney className="text-lg" />
                  <span>To'lov</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {user?.role === Role.EMPLOYEE && (
        <>
          <div className="border-b border-gray-200 pb-[0.5px] flex gap-6 mt-4">
            <NavLink
              to={`/employees/user/${id}`}
              className={({ isActive }) =>
                `custom-tab-link hover:text-black text-gray-600 ${
                  isActive ? "active" : ""
                }`
              }
              end
            >
              Yuvgan mashinalari
            </NavLink>
            <NavLink
              to={`/employees/user/${id}/expense-history`}
              className={({ isActive }) =>
                `custom-tab-link hover:text-black text-gray-600 ${
                  isActive ? "active" : ""
                }`
              }
            >
              Olgan maoshlari
            </NavLink>
            <NavLink
              to={`/employees/user/${id}/payments`}
              className={({ isActive }) =>
                `custom-tab-link hover:text-black text-gray-600 ${
                  isActive ? "active" : ""
                }`
              }
            >
              Olgan to'lovlari
            </NavLink>
          </div>
          <div className="py-4">
            <Outlet />
          </div>
        </>
      )}

      <UserPopup
        currentRole={Role.ADMIN}
        open={modalType === "edit"}
        onClose={handleClose}
        prevData={user}
      />
      <SalaryPopup
        open={modalType === "salary"}
        onClose={handleClose}
        employeeId={id}
        prevData={salary?.data?.payload}
      />

      <ExpensePopup
        open={modalType === "expense"}
        onClose={handleClose}
        employerId={id}
        name=""
      />
    </div>
  );
};

export default React.memo(UserDetail);
