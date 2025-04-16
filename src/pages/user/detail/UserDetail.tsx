import SalaryPopup from "@/components/salary-popup/SalaryPopup";
import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role, SalaryType } from "@/constant";
import { useGetSalaryByIdQuery } from "@/redux/api/salary";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/redux/api/user";
import { Alert, Button, Skeleton, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect, useState } from "react";
import { MdAttachMoney, MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbUserShield } from "react-icons/tb";
import { Outlet, useParams } from "react-router-dom";
import ExpensePopup from "../../../components/expense-popup/ExpensePopup";
import Options from "./Options";
import Tabs from "@/components/ui/Tabs";
import Box from "@/components/ui/Box";

type ModalType = "expense" | "edit" | "salary" | null;

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserByIdQuery(id!);
  const user = data?.data?.payload;
  const { data: salary, isError } = useGetSalaryByIdQuery(id!);
  const [modalType, setModalType] = useState<ModalType>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      {isError && user?.role !== Role.ADMIN && (
        <Alert
          message={"Oylik belgilanmagan. Avval oylikni belgilang"}
          style={{ width: "100%", marginBottom: "16px" }}
          type="error"
        />
      )}
      <Box>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
              <div className="flex md:items-center flex-row-reverse w-full  md:flex-row gap-3">
                <div className="max-md:mt-8">
                  <TbUserShield className="text-7xl text-text-muted" />
                </div>
                <div className="w-full ">
                  <h3 className="text-2xl font-medium">
                    {user?.f_name} {user?.l_name}
                  </h3>
                  <p className="text-text-muted my-1">@{user?.username}</p>
                  <p className="text-text-muted text-sm">{user?.address}</p>
                  <Tag color={user?.is_active ? "green" : "red"}>
                    {user?.is_active ? "Faol" : "Ishdan bo'shatilgan"}
                  </Tag>
                  <br />
                  {user?.role !== Role.ADMIN && (
                    <p className="text-text-muted text-sm mt-3 flex items-center gap-2">
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
                    <span className="text-text-muted text-sm">
                      {user?.createdAt.dateFormat()}
                    </span>
                  </Tooltip>
                </div>
              </div>

              <div className="flex w-full flex-col items-end gap-1.5 ">
                <div className="flex items-center">
                  {user?.role !== Role.ADMIN && (
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
                  )}
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
      </Box>
      {user?.role === Role.EMPLOYEE && (
        <>
          <Tabs
            className="mt-4"
            items={[
              { title: "Ishlari", path: `/employees/user/${id}`, id: 0 },
              {
                title: "Maosh",
                path: `/employees/user/${id}/expense-history`,
                id: 1,
              },
              {
                title: "Kirim",
                path: `/employees/user/${id}/payment-history`,
                id: 2,
              },
            ]}
          />
          <div className="py-4 min-h-[500px]">
            <Outlet />
          </div>
        </>
      )}

      {user?.role === Role.ADMIN && (
        <>
          <Tabs
            className="mt-4"
            items={[
              {
                title: "Maosh",
                path: `/admins/user/${id}/expense-history`,
                id: 1,
              },
              {
                title: "Chiqim",
                path: `/admins/user/${id}/admin-expense-history?filter=admin`,
                id: 2,
              },
            ]}
          />
          <div className="py-4 min-h-[500px]">
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
        name={`${user?.f_name} ${user?.l_name}`}
      />
    </div>
  );
};

export default React.memo(UserDetail);
