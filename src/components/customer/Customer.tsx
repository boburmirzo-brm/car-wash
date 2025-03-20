import React, { FC } from "react";
import Box from "../ui/Box";
import { MdPerson, MdPhone, MdCalendarToday } from "react-icons/md";
import TelPopUp from "../tel-pop-up/TelPopUp";

interface Props {
  data: any;
}

const Customer: FC<Props> = ({ data }) => {
  return (
    <div className="my-4 space-y-4">
      {data?.payload.map((item: any) => (
        <Box
          key={item._id}
          className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdPerson className="text-2xl text-blue-500" />
              <span className="font-semibold text-lg">{item.full_name}</span>
            </div>

            <span
              className={`font-semibold ${
                item.budget >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.budget.toLocaleString()} UZS
            </span>
          </div>

          <div className="mt-2 mb-2 flex items-center gap-4 text-gray-600">
            {item.tel_primary ? (
              <TelPopUp phoneNumber={item.tel_primary} />
            ) : (
              <div className="flex items-center gap-1">
                <MdPhone className="text-gray-400" />
                <span className="text-gray-400">Noma'lum</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <MdCalendarToday className="text-lg" />
            <span>{item.createdAt.split(" ")[0]}</span>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default React.memo(Customer);
