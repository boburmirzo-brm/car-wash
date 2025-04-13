import CarsView from "@/components/cars-view/CarsView";
import { ICar, IPayload } from "@/types";
import React from "react";
import { useOutletContext } from "react-router-dom";

interface ContextType {
  data: IPayload<ICar>;
  show: boolean;
}

const CarSearch = () => {
  const { data, show } = useOutletContext<ContextType>();
  return show && <>
    <h2 className="mt-4 text-text text-xl font-bold" >Mashinalari</h2>
    <CarsView data={data?.data?.payload} />
  </>;
};

export default React.memo(CarSearch);
