import { Button } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetEmployeesQuery } from "@/redux/api/user";
// import { useParamsHook } from "@/hooks/useParamsHook";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role } from "@/constant";
import Box from "@/components/ui/Box";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

const Employees = () => {
  const { isLoading } = useGetEmployeesQuery({});
  // const { setParam, removeParam, getParam } = useParamsHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // let value = getParam("q") || "";
  // const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value) {
  //     setParam("q", e.target.value);
  //   } else {
  //     removeParam("q");
  //   }
  // };
  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsModalOpen(false);
    if (!isBack) window.history.back();
  }, []);
  return (
    <div className="p-4">
      <Box>
        <div className="flex justify-between items-center mb-4">
          <div className=" flex items-center gap-4">
            <Title style={{ marginBottom: 0 }} level={4}>
              Ishchilar
            </Title>
            {/* <Input
              placeholder="Qidirish..."
              value={value}
              style={{ width: "300px" }}
              onChange={handleChangeInput}
            /> */}
          </div>
          <Button onClick={handleOpen} loading={isLoading} type="primary">
            <PlusOutlined />
          </Button>
        </div>
      </Box>
      <div className="px-4 flex gap-6 mt-4">
        <NavLink
          className={({ isActive }) =>
            `employees-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          end
          to={"/employees"}
        >
          Faol Ishchilar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `employees-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          to={"/employees/inactive-employees"}
        >
          Bo'shagan ishchilar
        </NavLink>
      </div>
      <div className="">
        <Outlet />
      </div>
      <UserPopup
        currentRole={Role.ADMIN}
        open={isModalOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default React.memo(Employees);
