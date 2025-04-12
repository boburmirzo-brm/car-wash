import CarWashing from "@/components/car-washing/CarWashing";
import { useGetMyWashingsQuery } from "@/redux/api/car-washing";
import { CustomEmpty } from "@/utils";
import React from "react";

const Employer = () => {
  const { data, isError } = useGetMyWashingsQuery(undefined);

  return <>{isError ? <CustomEmpty /> : <CarWashing data={data?.data} />}</>;
};

export default React.memo(Employer);
