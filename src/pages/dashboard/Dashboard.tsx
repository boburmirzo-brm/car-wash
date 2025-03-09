import Title from "antd/es/typography/Title";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="shadow bg-white md:p-6 p-4 rounded-md border border-gray-100 w-full">
        <Title level={4}>Dashboard</Title>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
