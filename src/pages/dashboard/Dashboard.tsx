import { Tag } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="shadow bg-white md:p-6 p-4 rounded-md border border-gray-100 w-full">
        <Title level={4}>Statistika</Title>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
          <div className="md:p-4 p-2 shadow-md rounded-md border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl mb-2 font-medium text-primary">5</h3>
              <Tag color={"yellow"}>PROCESS</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilyotgan mashinalar</p>
          </div>
          <div className="md:p-4 p-2 shadow-md rounded-md border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl mb-2 font-medium text-primary">14</h3>
              <Tag color={"green"}>DONE</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilgan mashinalar</p>
          </div>
          <div className="md:p-4 p-2 shadow-md rounded-md border border-gray-100">
            <h3 className="text-2xl mb-2 font-medium text-green-500">
              1,430,000 so'm
            </h3>
            <p className="text-sm text-gray-400">Kirim</p>
          </div>
          <div className="md:p-4 p-2 shadow-md rounded-md border border-gray-100">
            <h3 className="text-2xl mb-2 font-medium text-primary">
              800,000 so'm
            </h3>
            <p className="text-sm text-gray-400">Xarajat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
