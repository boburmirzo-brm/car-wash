import { useGetCarByIdQuery } from "@/redux/api/car";
import { Button, Skeleton } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoCarOutline, IoPlayOutline  } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCarByIdQuery(id || "");
  const car = data?.data.payload;
  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="shadow-md md:p-6 p-4 rounded-md border border-gray-100 w-full">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 ">
            <div className="flex items-center  w-full  flex-row gap-3">
              <div>
                <IoCarOutline className="text-7xl text-gray-600" />
              </div>
              <div className="w-full">
                <h3 className="text-2xl font-medium">{car?.name}</h3>
                <Link className="text-base text-gray-800 hover:underline" to={`/customer/${car?.customerId._id}`}>{car?.customerId.full_name}</Link>
              </div>
            </div>

            <div className="flex w-full flex-col items-end gap-3">
              <b className="border-2 border-gray-500 px-2 py-1 rounded-md text-base uppercase text-gray-700">
                {car?.plateNumber.plateNumberFormat()}
              </b>
              <div className="flex gap-1.5">
                <Button type="primary">
                  <FaRegEdit className="text-lg" />
                  <span>Tahrirlash</span>
                </Button>
                <Button type="primary">
                  <IoPlayOutline className="text-lg" />
                  <span>Start</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CarDetail);
