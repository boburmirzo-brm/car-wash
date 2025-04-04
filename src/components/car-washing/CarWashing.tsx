import React, { FC } from "react";
import Options from "./Options";
import { TbCoins, TbUserShield, TbUserX } from "react-icons/tb";
import { IoCarOutline } from "react-icons/io5";
import TelPopUp from "../tel-pop-up/TelPopUp";
import { Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Link } from "react-router-dom";
import CarNumber from "../cars-view/CarNumber";
import { FaRegCommentDots } from "react-icons/fa";
import CarWashingStatusTooltip from "./CarWashingStatusTooltip";
import Box from "../ui/Box";

interface Props {
  data: any;
  profile?: boolean;
}

const CarWashing: FC<Props> = ({ data, profile }) => {
  const role = useSelector((state: RootState) => state.role.value);

  return (
    <div className="my-4 space-y-4">
      {data?.payload.map((item: any) => (
        <Box key={item._id}>
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex-1 flex">
              <Link
                to={`/customer/${item?.customerId?._id}`}
                className="hover:underline text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                {item?.customerId?.full_name === "Noma'lum" && (
                  <TbUserX className="text-2xl text-yellow-500" />
                )}
                {item?.customerId?.full_name}
              </Link>
            </div>
            <CarWashingStatusTooltip status={item?.status} />
            <Options profile={profile} data={item} />
          </div>

          <div className="flex items-center justify-between mt-2">
            <Link
              to={`/car/${item?.carId?._id}`}
              className="flex hover:underline items-center gap-2 text-gray-700 flex-1"
            >
              <IoCarOutline className="text-lg text-gray-600 line-clamp-1" />
              <span title={item?.carId?.name} className="line-clamp-1 flex-1">
                {item?.carId?.name}
              </span>
            </Link>
            <Link to={`/car/${item?.carId?._id}`}>
              <CarNumber plateNumber={item?.carId?.plateNumber} />
            </Link>
          </div>

          {(role === Role.ADMIN || role === Role.OWNER || profile) && (
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-3">
              <div>
                {(role === Role.ADMIN || role === Role.OWNER) && (
                  <p className="flex items-center gap-2 text-gray-700 text-sm">
                    <TbUserShield className="text-lg" />
                    <Link
                      className="hover:underline"
                      to={`/employees/user/${item?.employerId?._id}`}
                    >
                      {item?.employerId?.l_name} {item?.employerId?.f_name}
                    </Link>
                  </p>
                )}
                <p className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  <TbCoins className="text-lg" />
                  <span>
                    {item?.employerSalary?.toLocaleString() || "0"} UZS
                  </span>
                </p>
              </div>
              <strong className="text-lg text-gray-900 font-semibold">
                {item?.washAmount?.toLocaleString() || "0"} UZS
              </strong>
            </div>
          )}
          {item?.comment && (
            <div className="text-gray-600 text-sm mt-3 flex items-center gap-2">
              <FaRegCommentDots className="text-lg" />
              <span>{item?.comment}</span>
            </div>
          )}
          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
            <TelPopUp phoneNumber={item?.customerId?.tel_primary} />
          </div>
        </Box>
      ))}
    </div>
  );
};

export default React.memo(CarWashing);
