import Title from "antd/es/typography/Title";
import React from "react";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";

const CustomerCar = () => {
  return (
    <div className="p-4">
      <Box>
        <Title style={{ marginBottom: 0 }} level={4}>
          Mijoz va Mashinalar
        </Title>
      </Box>
      <Tabs
        className="mt-4"
        items={[
          { title: "Mijozlar", path: "/customer-car", id: 0 },
          { title: "Mashinalar", path: "/customer-car/cars", id: 1 },
        ]}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default React.memo(CustomerCar);
