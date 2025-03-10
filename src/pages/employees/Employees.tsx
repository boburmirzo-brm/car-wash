import { Button, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetEmployeesQuery } from "@/redux/api/user";
import UsersView from "@/components/users-view/UsersView";
// import { useParamsHook } from "@/hooks/useParamsHook";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role } from "@/constant";

const Employees = () => {
  const { data, isLoading } = useGetEmployeesQuery();
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
      <div className="shadow bg-white md:p-6 p-4 rounded-md border border-gray-100 w-full">
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
          <Button
            onClick={handleOpen}
            loading={isLoading}
            type="primary"
          >
            <PlusOutlined />
          </Button>
        </div>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <UsersView data={data?.data.payload} />
        )}
      </div>
       <UserPopup currentRole={Role.ADMIN} open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default React.memo(Employees);
