import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import CarNumber from "./CarNumber";
import { MdOutlineLocalCarWash } from "react-icons/md";
import Box from "../ui/Box";

const CarsView: FC<{ data: any }> = ({ data }) => {
  const navigate = useNavigate();  

  return (
    <div className="space-y-4 my-4">
      {data?.map((car: any) => (
        <Box
          onClick={() => navigate(`/car/${car._id}`)}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          key={car._id}
        >
          <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start ">
            <h3 className="text-base font-semibold  flex-1">
              {car.name}
            </h3>
            <div className="flex max-[500px]:w-full max-[500px]:justify-end">
              {car.isWashing && (
                <div className="text-blue-500 px-2 py-1 rounded-md text-xl car-wash-animation">
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
