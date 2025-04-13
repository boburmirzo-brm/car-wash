import { Skeleton } from "antd";
import React from "react";
import { useGetEmployeesQuery } from "@/redux/api/user";
import UsersView from "@/components/users-view/UsersView";
import Box from "@/components/ui/Box";
import { CustomEmpty } from "@/utils";

const InactiveEmployees = () => {
  const { data, isLoading, isError } = useGetEmployeesQuery({
    is_active: false,
  });

  return (
    <div className="py-4">
      <Box>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-text text-xl font-bold">
            Bo'shagan ishchilar
          </h2>
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

export default React.memo(InactiveEmployees);
