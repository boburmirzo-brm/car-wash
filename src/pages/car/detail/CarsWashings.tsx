import React, { FC } from "react";
import { TbCoins, TbUserX } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

interface Props {
  data: any;
  profile?: boolean;
}

const CarsWashings: FC<Props> = ({ data, profile }) => {
  const role = useSelector((state: RootState) => state.role.value);

  return (
    <div className="my-4 space-y-4">
      {data?.map((item: any) => (
        <div
          key={item._id}
          className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300"
        >
          <div className="flex items-center justify-between">
              {item?.employerId?.full_name === "Noma'lum" && (
                <TbUserX className="text-2xl text-yellow-500" />
              )}
              Yuvuvchi: {item?.employerId?.f_name} {item?.employerId?.l_name}
          </div>

          {/* <div className="flex items-center justify-between mt-2">
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
          </div> */}

          {role === Role.ADMIN ||
            (profile && (
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
            ))}

          <div className="flex justify-between items-center mt-3 text-gray-600 text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CarsWashings);
