import { Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useGetEmployeesQuery } from "@/redux/api/user";
import UsersView from "@/components/users-view/UsersView";
import Box from "@/components/ui/Box";
import { CustomEmpty } from "@/utils";

const ActiveEmployees = () => {
  const { data, isLoading, isError } = useGetEmployeesQuery({ is_active: true });

  return (
    <div className="py-4">
      <Box>
        <div className="flex justify-between items-center mb-4">
          <Title style={{ marginBottom: 0 }} level={4}>
            Faol ishchilar
          </Title>
        </div>
        {isError && <CustomEmpty />}
        {isLoading ? (
          <Skeleton active />
        ) : (
          <UsersView data={data?.data.payload} />
        )}
        {!isLoading && !data?.data.payload.length && <CustomEmpty />}
      </Box>
    </div>
  );
};

export default React.memo(ActiveEmployees);
