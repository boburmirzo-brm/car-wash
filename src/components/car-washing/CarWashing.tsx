import React, { FC } from "react";
import Options from "./Options";
import { TbCoins, TbUserX } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import TelPopUp from "../tel-pop-up/TelPopUp";
import { Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Link } from "react-router-dom";

interface Props {
  data: any;
}

const CarWashing: FC<Props> = ({ data }) => {
  const role = useSelector((state: RootState) => state.role.value);
  console.log(data);

  return (
    <div className="my-4 space-y-4">
      {data?.payload.map((item: any) => (
        <div
          key={item._id}
          className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
        >
          <div className="flex items-center justify-between">
            <Link to={`/customer/${item?.customerId?._id}`} className="text-base font-semibold text-gray-800 flex items-center gap-2">
              {item?.customerId?.full_name === "Noma'lum" && (
                <TbUserX className="text-2xl text-yellow-500" />
              )}
              {item?.customerId?.full_name}
            </Link>
            <Options data={item} />
          </div>

          <div className="flex items-center justify-between mt-2">
            <Link to={`/car/${item?.carId?._id}`} className="flex items-center gap-2 text-gray-700 ">
              <IoCarOutline className="text-lg text-gray-600" />
              <span>{item?.carId?.name}</span>
            </Link>
            <Link to={`/car/${item?.carId?._id}`} className="border-2 font-bold border-gray-500 px-2 py-1 rounded-md uppercase text-gray-700 text-base">
              {item?.carId?.plateNumber?.plateNumberFormat()}
            </Link>
          </div>

          {role === Role.ADMIN && (
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-3">
              <div>
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <AiOutlineUser className="text-lg" />
                  <span>Samandar Hamraqulov</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <TbCoins className="text-lg" />
                  <span>60 000 UZS</span>
                </p>
              </div>
              <strong className="text-lg text-gray-900 font-semibold">
                120 000 UZS
              </strong>
            </div>
          )}

          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
            <TelPopUp phoneNumber={item?.customerId?.tel_primary} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CarWashing);
