import { ICar } from "@/types";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import CarNumber from "./CarNumber";

const CarsView: FC<{ data: ICar[] }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 my-4">
      {data?.map((car: ICar) => (
        <div
          onClick={() => navigate(`/car/${car._id}`)}
          key={car._id}
          className="bg-white shadow-sm rounded-md p-4 max-[500px]:p-3 border border-gray-300 cursor-pointer hover:bg-gray-100 duration-200"
        >
          <div className="flex items-center justify-between max-[500px]:flex-col max-[500px]:items-start ">
            <h3 className="text-base font-semibold text-gray-800">
              {car.name}
            </h3>
            <div className="flex max-[500px]:w-full max-[500px]:justify-end">
              <CarNumber plateNumber={car.plateNumber} />
              {/* <b className="border border-gray-500 px-2 py-1 rounded-md text-base uppercase text-gray-700">
                {car.plateNumber?.plateNumberFormat()}
              </b> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CarsView);
