import React, { FC } from "react";
import Box from "../ui/Box";
import TelPopUp from "../tel-pop-up/TelPopUp";
import { Link } from "react-router-dom";
import { TbUserX } from "react-icons/tb";

interface Props {
  data: any;
}

const Customer: FC<Props> = ({ data }) => {
  return (
    <div className="my-4 space-y-4">
      {data?.payload.map((customer: any) => (
        <Box key={customer?._id} className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              {customer?.full_name === "Noma'lum" && (
                <TbUserX className="text-2xl text-yellow-500" />
              )}
              <Link
                to={`/customer/${customer?._id}`}
                className="font-semibold text-lg hover:underline line-clamp-1"
              >
                {customer?.full_name}
              </Link>
            </div>

            <span
              className={`font-semibold text-lg ${
                customer?.budget === 0
                  ? "text-gray-600"
                  : customer?.budget >= 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {customer?.budget?.toLocaleString()} UZS
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="gap-1 text-sm text-gray-600">
              {customer?.createdAt?.dateFormat()}{" "}
              {customer?.createdAt?.timeFormat()}
            </span>
            <TelPopUp phoneNumber={customer?.tel_primary} />
          </div>
        </Box>
      ))}
    </div>
  );
};

export default React.memo(Customer);
