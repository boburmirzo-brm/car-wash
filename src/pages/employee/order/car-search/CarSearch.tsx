import CarsView from "@/components/cars-view/CarsView";
import { ICar, IPayload } from "@/types";
import Title from "antd/es/typography/Title";
import React from "react";
import { useOutletContext } from "react-router-dom";

interface ContextType {
  data: IPayload<ICar>;
  show: boolean;
}

const CarSearch = () => {
  const { data, show } = useOutletContext<ContextType>();
  return show && <>
    <Title className="mt-4" level={4}>Mashinalari</Title>
    <CarsView data={data?.data?.payload} />
  </>;
};

export default React.memo(CarSearch);
