import { Tag } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useStatsQuery } from "@/redux/api/stats";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";
import { fromToTime } from "@/helper";
import { useCheckTokenQuery } from "@/redux/api/auth";

const Dashboard = () => {
  const { data: profile } = useCheckTokenQuery(undefined);
  const { from, to } = fromToTime(profile?.user?.time || "", 5);
  const { data } = useStatsQuery({ fromDate: from, toDate: to });

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <Box className="flex items-center justify-between flex-wrap gap-4">
          <Title level={4} style={{ marginBottom: 0 }}>
            Statistika
          </Title>
        </Box>
        <div className="grid lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-3">
          <Box>
            <div className="flex flex-1 items-start justify-between">
              <h3 className="sm:text-2xl text-xl mb-2 font-medium text-primary">
                {data?.data?.payload?.pendingTotal}
              </h3>
              <Tag color={"yellow"}>JARAYONDA</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilyotgan mashinalar</p>
          </Box>
          <Box>
            <div className="flex flex-1 items-start justify-between">
              <h3 className="sm:text-2xl text-xl mb-2 font-medium text-primary">
                {data?.data?.payload?.completedTotal}
              </h3>
              <Tag color={"green"}>TAYYOR</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilgan mashinalar</p>
          </Box>

          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-primary">
                {data?.data?.payload?.totalExpense?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Xarajat</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-primary">
                {data?.data?.payload?.employeeExpense?.toLocaleString() || "0"}{" "}
                UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Ishchi maoshi</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-green-500">
                {data?.data?.payload?.totalAmount?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Kirim</p>
          </Box>
        </div>
      </div>
      <Tabs
        className="mx-4"
        items={[
          { title: "Jarayonda", path: "/", id: 0 },
          { title: "Tayyor", path: "/car-washing-done", id: 1 },
        ]}
      />

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
