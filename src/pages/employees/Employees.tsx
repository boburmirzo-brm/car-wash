import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetEmployeesQuery } from "@/redux/api/user";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role } from "@/constant";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";
import SearchWrapper from "@/components/search/SearchWrapper";

const Employees = () => {
  const { isLoading } = useGetEmployeesQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <h2 className="text-text text-xl font-bold">Ishchilar</h2>
          </div>
          <Button onClick={handleOpen} loading={isLoading} type="primary">
            <PlusOutlined />
          </Button>
        </div>
        <SearchWrapper />
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
      <div>
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
