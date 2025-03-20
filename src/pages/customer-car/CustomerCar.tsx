
import Title from "antd/es/typography/Title";
import React from "react";
import Box from "@/components/ui/Box";
import { NavLink, Outlet } from "react-router-dom";
import "./style.css";

const CustomerCar = () => {
  return (
    <div className="p-4">
      <Box>
        <div className="flex justify-between items-center mb-4">
          <div className=" flex items-center gap-4">
            <Title style={{ marginBottom: 0 }} level={4}>
              Mijoz va Mashinalar
            </Title>
          </div>
        </div>
      </Box>
      <div className="px-4 flex gap-6 mt-4">
        <NavLink
          className={({ isActive }) =>
            `customer-car-link hover:text-black text-gray-600 ${
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
            `customer-car-link hover:text-black text-gray-600 ${
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
