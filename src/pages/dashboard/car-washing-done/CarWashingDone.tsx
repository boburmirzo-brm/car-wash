import CarWashing from "@/components/car-washing/CarWashing";
import Box from "@/components/ui/Box";
import { useGetCarWashingsQuery } from "@/redux/api/car-washing";
import { Button, DatePicker, Skeleton } from "antd";
import React from "react";
import { PiBroom } from "react-icons/pi";

const { RangePicker } = DatePicker;

const CarWashingDone = () => {
  const { data, isLoading } = useGetCarWashingsQuery({ done: "1" });

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <span>Tayyor</span>
        </div>
        <div className="flex items-center gap-2">
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            // onChange={handleFilterChange}
          />
          <Button
            type="default"
            //   onClick={clearFilters}
          >
            <PiBroom className="text-xl" />
          </Button>
        </div>
      </div>
      {isLoading && <Box className="mt-4"><Skeleton active /></Box>}
      <CarWashing data={data?.data} />
    </div>
  );
};

export default React.memo(CarWashingDone);
