import { Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useGetEmployeesQuery } from "@/redux/api/user";
import UsersView from "@/components/users-view/UsersView";
import Box from "@/components/ui/Box";

const InactiveEmployees = () => {
  // Faqat is_active=false bo'lgan ishchilarni olish
  const { data, isLoading } = useGetEmployeesQuery({ is_active: false });

  return (
    <div className="p-4">
      <Box>
        <div className="flex justify-between items-center mb-4">
          <Title style={{ marginBottom: 0 }} level={4}>
            Noaktiv Ishchilar
          </Title>
        </div>

        {isLoading ? (
          <Skeleton active />
        ) : (
          <UsersView data={data?.data.payload} />
        )}
      </Box>
    </div>
  );
};

export default React.memo(InactiveEmployees);
