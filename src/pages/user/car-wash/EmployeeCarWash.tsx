import CarWashing from "@/components/car-washing/CarWashing";
import { useGetByEmployeeIdQuery } from "@/redux/api/car-washing";
import React from "react";
import { useParams } from "react-router-dom";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

const CarWahingProgress = () => {
  const { id } = useParams();
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isLoading, isError, isFetching } = useGetByEmployeeIdQuery({
    id: id,
    params: filters,
  });

  return (
    <>
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.totalAmount || 0}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        totalItems={data?.data?.total}
        limit={limit}
        page={page}
        title="To'lovlar"
      >
        <CarWashing data={data?.data} />
      </DateWithPagination>
    </>
  );
};

export default React.memo(CarWahingProgress);
