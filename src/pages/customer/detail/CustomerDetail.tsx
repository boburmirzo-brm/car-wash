import TelPopUp from "@/components/tel-pop-up/TelPopUp";
import { useGetCustomerByIdQuery } from "@/redux/api/customer";
import { Button, Empty, Skeleton, Typography } from "antd";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { TbUser } from "react-icons/tb";
import CarsView from "@/components/cars-view/CarsView";

const { Title } = Typography;

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCustomerByIdQuery(id || "");

  const customer = data?.data.payload.customer;
  const cars = data?.data.payload.cars;

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="shadow-md md:p-6 p-4 rounded-md border border-gray-100 w-full">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
            <div className="flex items-center  w-full  flex-row gap-3">
              <div>
                <TbUser className="text-7xl text-gray-600" />
              </div>
              <div className="w-full ">
                <h3 className="text-2xl font-medium">{customer?.full_name}</h3>
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-1.5">
              <Title
                level={3}
                type={(customer?.budget || 0) >= 0 ? "success" : "danger"}
                style={{ marginBottom: 0 }}
              >
                {(customer?.budget || 0)?.toLocaleString() || "0"} UZS
              </Title>
              <TelPopUp phoneNumber={customer?.tel_primary || ""} />
              <div className="flex gap-1.5">
                <Button type="primary">
                  <FaRegEdit className="text-lg" />
                  <span>Tahrirlash</span>
                </Button>
                <Button type="primary">
                  <MdAttachMoney className="text-lg" />
                  <span>To'lov</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="shadow-md md:p-6 p-4 rounded-md border border-gray-100 w-full">
        <div className="flex justify-between">
          <Title level={4}>Mijoz mashinalari</Title>
          <Button type="primary">
            <PlusOutlined />
          </Button>
        </div>
        {
          cars?.length ? 
          <CarsView data={cars || []}/>
          :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </div>
    </div>
  );
};

export default React.memo(CustomerDetail);
