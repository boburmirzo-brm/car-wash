import React, { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import "./style.css";
import TelPopUp from "../tel-pop-up/TelPopUp";
import CreateCustomerModal from "../create-customer/CreateCustomerModal";
import { useGetCustomersQuery } from "../../redux/api/customer";
import { useGetCarsQuery } from "../../redux/api/car";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("customer");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: customerData, isLoading: isCustomerLoading } =
    useGetCustomersQuery(searchTerm ? { filter: searchTerm } : {});

  const { data: carData, isLoading: isCarLoading } = useGetCarsQuery(
    searchTerm ? { filter: searchTerm } : undefined
  );

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <div className="flex gap-2">
        <Input
          autoFocus
          placeholder="Qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="primary" onClick={handleOpen}>
          <PlusOutlined />
        </Button>
      </div>

      <div className="mt-4">
        <Segmented<string>
          options={[
            {
              value: "customer",
              icon: <AiOutlineUser size={18} />,
              label: "Mijoz",
              className: "flex items-center justify-center search-bar",
            },
            {
              value: "car",
              icon: <IoCarOutline size={18} />,
              label: "Mashina",
              className: "flex items-center justify-center search-bar",
            },
          ]}
          onChange={setSelectedType}
          block
          value={selectedType}
        />
      </div>

      <div className="space-y-4 my-4">
        {selectedType === "customer" ? (
          isCustomerLoading ? (
            <p>Yuklanmoqda...</p>
          ) : (
            customerData?.data?.payload?.map((customer: any) => (
              <div
                key={customer._id}
                className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
              >
                <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-4">
                  <h3 className="text-base font-semibold text-gray-800">
                    {customer.full_name}
                  </h3>
                  <TelPopUp phoneNumber={customer.tel_primary} />
                </div>
              </div>
            ))
          )
        ) : isCarLoading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          carData?.data?.payload?.map((car: any) => (
            <div
              key={car._id}
              className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
            >
              <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start max-[500px]:gap-4">
                <h3 className="text-base font-semibold text-gray-800">
                  {car.name} ({car.plateNumber})
                </h3>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateCustomerModal open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default React.memo(Search);
