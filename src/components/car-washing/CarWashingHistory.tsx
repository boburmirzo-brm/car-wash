import React from "react";
import { useGetMyWashingsQuery } from "../../redux/api/car-washing";
import CarWashing from "./CarWashing";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "../ui/DateWithPagination";

const CarWashingHistory = () => {
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isError, isFetching, isLoading } = useGetMyWashingsQuery({
    ...filters,
    done: "1",
  });

  return (
    <div className=" space-y-4">
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.totalAmount || 0}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        totalItems={data?.data?.total || 0}
        limit={limit}
        page={page}
        title="To'lovlar"
      >
        <CarWashing profile={true} data={data?.data} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(CarWashingHistory);