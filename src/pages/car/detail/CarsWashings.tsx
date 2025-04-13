import React, { FC } from "react";
import { TbCoins } from "react-icons/tb";
// import { AiOutlineUser } from "react-icons/ai";
import { CarWashingStatus, Role } from "@/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { TbUserShield } from "react-icons/tb";
import CarWashingStatusTooltip from "@/components/car-washing/CarWashingStatusTooltip";
import Box from "@/components/ui/Box";
import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";

interface Props {
  data: any;
  profile?: boolean;
}

const CarsWashings: FC<Props> = ({ data, profile }) => {
  const role = useSelector((state: RootState) => state.role.value);

  return (
    <div className=" space-y-4">
      {data?.map((item: any) => (
        <Box key={item._id}>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 ">
              <TbUserShield className="text-xl" />
              <Link
                to={`/employees/user/${item?.employerId?._id}`}
                className="hover:underline"
              >
                {item?.employerId?.f_name} {item?.employerId?.l_name}
              </Link>
            </div>
            <CarWashingStatusTooltip status={item?.status} />
          </div>

          {(role === Role.ADMIN || role === Role.OWNER || profile) &&
            !(
              item?.status === CarWashingStatus.CANCELED ||
              item?.status === CarWashingStatus.PENDING
            ) && (
              <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-3 rounded-md mt-3">
                <div>
                  <p className="flex items-center gap-2 text-text-muted text-sm font-medium">
                    <TbCoins className="text-lg" />
                    <span>
                      {role === Role.ADMIN || role === Role.OWNER
                        ? item?.employerSalary?.toLocaleString() || "0" + "UZS"
                        : "*****"}
                    </span>
                  </p>
                </div>
                <strong className="text-lg text-text font-semibold">
                  {item?.washAmount?.toLocaleString() || "0"} UZS
                </strong>
              </div>
            )}
          {item?.comment && (
            <div className="text-text-muted text-sm mt-3 flex gap-2">
              <FaRegCommentDots className="text-lg min-w-4" />
              <span>{item?.comment}</span>
            </div>
          )}
          <div className="flex justify-between items-center mt-3 text-text-muted text-sm">
            <span>
              {item?.createdAt?.dateFormat()} {item?.createdAt?.timeFormat()}
            </span>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default React.memo(CarsWashings);
