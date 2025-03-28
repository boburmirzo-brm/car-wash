import UsersView from "@/components/users-view/UsersView";
import { useGetAdminsQuery } from "@/redux/api/user";
import { Button, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UserPopup from "@/components/user-popup/UserPopup";
import { Role } from "@/constant";
import Box from "@/components/ui/Box";

const Admins = () => {
  const { data, isLoading } = useGetAdminsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsModalOpen(false);
    if (!isBack) window.history.back();
  }, []);
  return (
    <div className="p-4">
      <Box >
        <div className="flex justify-between mb-4">
          <Title level={4}>Adminlar</Title>
          <Button onClick={handleOpen} loading={isLoading} type="primary">
            <PlusOutlined />
          </Button>
        </div>

        {isLoading ? (
          <Skeleton active />
        ) : (
          <UsersView data={data?.data.payload} />
        )}
      </Box>
      <UserPopup currentRole={Role.OWNER} open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default React.memo(Admins);
