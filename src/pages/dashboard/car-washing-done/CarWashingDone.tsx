import CarWashing from "@/components/car-washing/CarWashing";
import { useGetCarWashingsQuery } from "@/redux/api/car-washing";
import React from "react";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

const CarWashingDone = () => {
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isLoading, isError, isFetching } =
    useGetCarWashingsQuery(filters);
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
        title="Yuvilgan mashinalar"
      >
        <CarWashing data={data?.data} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(CarWashingDone);
