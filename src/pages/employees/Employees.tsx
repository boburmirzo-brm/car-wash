import { Button } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetEmployeesQuery } from "@/redux/api/user";
// import { useParamsHook } from "@/hooks/useParamsHook";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role } from "@/constant";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";

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
        <div className="flex justify-between items-center">
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
      <Tabs
        className="mt-4 "
        items={[
          { title: "Faol ishchilar", path: "", id: 0 },
          {
            title: "Bo'shagan ishchilar",
            path: "/employees/inactive-employees",
            id: 1,
          },
        ]}
      />
      <div >
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
