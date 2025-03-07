import React, { FC, useCallback, useState, ChangeEvent } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import "./style.css";
// import TelPopUp from "../tel-pop-up/TelPopUp";
import CustomerPopup from "../customer-popup/CustomerPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { useParamsHook } from "@/hooks/useParamsHook";
// import { useGetCustomersQuery } from "@/redux/api/customer";
// import { useGetCarsQuery } from "@/redux/api/car";

// interface Props {
//   searchTerm: string,
//   setSearchTerm: (term: string) => void
// }

const Search:FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {setParam, removeParam, getParam} = useParamsHook()
  let value = getParam("q") || ""

  // const [selectedType, setSelectedType] = useState("car");
  // const [searchTerm, setSearchTerm] = useState("");

  // const { data: customerData, isLoading: isCustomerLoading } =
  //   useGetCustomersQuery(searchTerm ? { filter: searchTerm } : {});

  // const { data: carData, isLoading: isCarLoading } = useGetCarsQuery(
  //   searchTerm ? { filter: searchTerm } : undefined
  // );
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const currentPathname = pathname.endsWith("/customer") ? "customer" : "";

  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsModalOpen(false)
    if (!isBack) window.history.back();
  }, []);

  const handleChange = (value:string)=>{
    removeParam("q")
    navigate(`/employee/order/${value}`)
    // setSearchTerm("")
  }
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value){
      setParam("q", e.target.value);
    }else{
      removeParam("q")
    }
  }
  return (
    <div>
      <div className="flex gap-2">
        <Input
          autoFocus
          placeholder="Qidirish..."
          value={value}
          onChange={handleChangeInput}
        />
        <Button type="primary" onClick={handleOpen}>
          <PlusOutlined />
        </Button>
      </div>

      <div className="mt-4">
        <Segmented<string>
          options={[
            {
              value: "",
              icon: <IoCarOutline size={18} />,
              label: "Mashina",
              className: "flex items-center justify-center search-bar",
            },
            {
              value: "customer",
              icon: <AiOutlineUser size={18} />,
              label: "Mijoz",
              className: "flex items-center justify-center search-bar",
            },
          ]}
          onChange={(value)=> handleChange(value)}
          block
          value={currentPathname}
        />
      </div>

      {/* <div className="space-y-4 my-4">
        {selectedType === "customer" ? (
          isCustomerLoading ? (
            <p>Yuklanmoqda...</p>
          ) : (
            customerData?.data?.payload?.map((customer: any) => (
              <div
                key={customer._id}
                className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
              >
                <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start ">
                  <h3 className="text-base font-semibold text-gray-800">
                    {customer.full_name}
                  </h3>
                  <div className="flex max-[500px]:w-full max-[500px]:justify-end">
                    <TelPopUp phoneNumber={customer.tel_primary} />
                  </div>
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
              <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start ">
                <h3 className="text-base font-semibold text-gray-800">
                  {car.name}
                </h3>
                <div className="flex max-[500px]:w-full max-[500px]:justify-end">
                  <b className="border border-gray-500 px-2 py-1 rounded-md text-xs uppercase text-gray-700">
                    {car.plateNumber?.plateNumberFormat()}
                  </b>
                </div>
              </div>
            </div>
          ))
        )}
      </div> */}
      <CustomerPopup open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default React.memo(Search);
