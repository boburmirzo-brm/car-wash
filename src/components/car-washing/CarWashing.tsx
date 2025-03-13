import React, { FC } from "react";
import Options from "./Options";
import { TbCancel, TbCoins, TbUserX } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import TelPopUp from "../tel-pop-up/TelPopUp";
import { CarWashingStatus, Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { Link } from "react-router-dom";
import CarNumber from "../cars-view/CarNumber";
import { IoMdDoneAll } from "react-icons/io";
import { MdOutlinePending } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";

interface Props {
  data: any;
  profile?: boolean;
}

const CarWashing: FC<Props> = ({ data, profile }) => {
  const role = useSelector((state: RootState) => state.role.value);

  return (
    <div className="my-4 space-y-4">
      {data?.payload.map((item: any) => (
        <div
          key={item._id}
          className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
        >
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex-1 flex">
              <Link
                to={`/customer/${item?.customerId?._id}`}
                className="text-base font-semibold text-gray-800 flex items-center gap-2"
              >
                {item?.customerId?.full_name === "Noma'lum" && (
                  <TbUserX className="text-2xl text-yellow-500" />
                )}
                {item?.customerId?.full_name}
              </Link>
            </div>
            {item?.status === CarWashingStatus.PENDING ? (
              <MdOutlinePending className="text-xl text-yellow-500" />
            ) : item?.status === CarWashingStatus.COMPLETED ? (
              <IoMdDoneAll className="text-green-700" />
            ) : (
              <TbCancel  className="text-xl text-red-500" />
            )}
            <Options profile={profile} data={item} />
          </div>

          <div className="flex items-center justify-between mt-2">
            <Link
              to={`/car/${item?.carId?._id}`}
              className="flex items-center gap-2 text-gray-700 "
            >
              <IoCarOutline className="text-lg text-gray-600" />
              <span>{item?.carId?.name}</span>
            </Link>
            <Link to={`/car/${item?.carId?._id}`}>
              <CarNumber plateNumber={item?.carId?.plateNumber} />
            </Link>
          </div>

          {(role === Role.ADMIN || profile) &&
            item?.status === CarWashingStatus.COMPLETED && (
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-3">
                <div>
                  {role === Role.ADMIN && (
                    <p className="flex items-center gap-2 text-gray-700 text-sm">
                      <AiOutlineUser className="text-lg" />
                      <span>
                        {item?.employerId?.l_name} {item?.employerId?.f_name}
                      </span>
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
        </div>
      ))}
    </div>
  );
};

export default React.memo(CarWashing);
