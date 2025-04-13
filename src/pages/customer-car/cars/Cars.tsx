import React, { useEffect } from "react";
import { useGetCarsQuery } from "../../../redux/api/car";
import CarsView from "../../../components/cars-view/CarsView";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

const Cars = () => {
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter(0, true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { data, isLoading, isError, isFetching } = useGetCarsQuery(filters);
  const cars = data?.data?.payload || [];

  return (
    <div className="mt-4">
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.total || 0}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        totalItems={data?.data?.total || 0}
        limit={limit}
        page={page}
        suffix={"ta"}
        title="Mashinalar"
      >
        <CarsView data={cars} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(Cars);
