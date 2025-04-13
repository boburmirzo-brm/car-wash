import React from "react";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";

const CustomerCar = () => {
  return (
    <div className="p-4">
      <Box>
        <h2 className="text-text text-xl font-bold" >
          Mijoz va Mashinalar
        </h2>
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
