import { Tag } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useStatsQuery } from "../../redux/api/auth";
import Box from "@/components/ui/Box";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css"

const Dashboard = () => {
  const { data } = useStatsQuery({});
  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <Box>
          <Title level={4} style={{ marginBottom: 0 }}>
            Statistika
          </Title>
        </Box>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
          <Box>
            <div className="flex flex-1 items-center justify-between">
              <h3 className="text-2xl mb-2 font-medium text-primary">
                {data?.data?.payload?.pendingTotal}
              </h3>
              <Tag color={"yellow"}>PROCESS</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilyotgan mashinalar</p>
          </Box>
          <Box>
            <div className="flex flex-1 items-center justify-between">
              <h3 className="text-2xl mb-2 font-medium text-primary">
                {data?.data?.payload?.completedTotal}
              </h3>
              <Tag color={"green"}>DONE</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilgan mashinalar</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="text-2xl  mb-2 font-medium text-green-500">
                {data?.data?.payload?.totalAmount?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Kirim</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="text-2xl  mb-2 font-medium text-primary">
                {data?.data?.payload?.totalExpense?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Xarajat</p>
          </Box>
        </div>
      </div>
      <div className="px-4 flex gap-6">
        <NavLink className={`hover:text-black text-gray-600 dashboard-link`} to={"/"}>Jarayonda</NavLink>
        <NavLink className={`hover:text-black text-gray-600 dashboard-link`} to={"/car-washing-done"}>Tayyor</NavLink>
      </div>
      <div className="p-4"><Outlet/></div>
    </>
  );
};

export default React.memo(Dashboard);
