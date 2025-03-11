import React, { FC } from "react";

const CarNumber:FC<{plateNumber?:string | null}> = ({plateNumber}) => {
  return (
    <b className={`${plateNumber ? "border-gray-500" : "bg-gray-100 border-gray-300"} border-2  px-2 py-1 rounded-md text-base uppercase text-gray-700`}>
      {plateNumber ? plateNumber?.plateNumberFormat() : "Nomer Yoq"}
    </b>
  );
};

export default React.memo(CarNumber);
