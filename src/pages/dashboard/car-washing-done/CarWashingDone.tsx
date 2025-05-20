import CarWashing from "@/components/car-washing/CarWashing";
import { useGetCarWashingsQuery } from "@/redux/api/car-washing";
import React, { useCallback } from "react";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";
import { Select } from "antd";
import { useParamsHook } from "@/hooks/useParamsHook";
const { Option } = Select;

const CarWashingDone = () => {
  const { setParam, removeParam, getParam } = useParamsHook();
  const bonus = getParam("bonus");
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isLoading, isError, isFetching } = useGetCarWashingsQuery({
    ...filters,
    done: "1",
    isBonus: bonus === "bonus" ? true : null,
  });
  
  const handleTypeChange = useCallback(
    (value: string) => {
      if (value === "bonus") {
        setParam("bonus", "bonus");
      } else {
        removeParam("bonus");
      }
      setParam("page", "1");
    },
    [setParam, removeParam]
  );
  return (
    <div className="min-h-[500px]">
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.totalAmount || 0}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        totalItems={data?.data?.total || 0}
        limit={limit}
        page={page}
        extraOptions={
          <Select
            defaultValue=""
            value={filters.bonus}
            onChange={handleTypeChange}
            className="w-40"
          >
            <Option value="">Hammasi</Option>
            <Option value="bonus">Bonus</Option>
          </Select>
        }
        title="Yuvilgan"
      >
        <CarWashing data={data?.data} profile={true} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(CarWashingDone);
