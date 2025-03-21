import Title from "antd/es/typography/Title";
import React from "react";
import Box from "@/components/ui/Box";
import { NavLink, Outlet } from "react-router-dom";

const CustomerCar = () => {
  return (
    <div className="p-4">
      <Box>
        <Title style={{ marginBottom: 0 }} level={4}>
          Mijoz va Mashinalar
        </Title>
      </Box>
      <div className=" flex gap-6 mt-4 border-b border-gray-200 pb-[0.5px]">
        <NavLink
          className={({ isActive }) =>
            `custom-tab-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          end
          to={"/customer-car"}
        >
          Mijozlar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `custom-tab-link hover:text-black text-gray-600 ${
              isActive ? "active" : ""
            }`
          }
          to={"/customer-car/cars"}
        >
          Mashinalar
        </NavLink>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default React.memo(CustomerCar);
