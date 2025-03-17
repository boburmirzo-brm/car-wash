import { ICar } from "@/types";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import CarNumber from "./CarNumber";
import { MdOutlineLocalCarWash } from "react-icons/md";
import Box from "../ui/Box";

const CarsView: FC<{ data: ICar[] }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 my-4">
      {data?.map((car: ICar) => (
        <Box onClick={() => navigate(`/car/${car._id}`)} className="cursor-pointer hover:bg-gray-100" key={car._id}>
          <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start ">
            <h3 className="text-base font-semibold text-gray-800 flex-1">
              {car.name}
            </h3>
            <div className="flex max-[500px]:w-full max-[500px]:justify-end">
              {car.isWashing && (
                <div className="text-blue-500 px-2 py-1 rounded-md text-xl">
                  <MdOutlineLocalCarWash />
                </div>
              )}
              <CarNumber plateNumber={car.plateNumber} />
            </div>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default React.memo(CarsView);
