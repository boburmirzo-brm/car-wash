import React, { useEffect } from "react";
import { useGetAllPaymentQuery } from "../../redux/api/payment";
import Payment from "./Payment";
import DateWithPagination from "@/components/ui/DateWithPagination";
import useFilter from "@/hooks/useFilter";

const PaymentHistory = () => {
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { data, isError, isFetching, isLoading } =
    useGetAllPaymentQuery(filters);

  const totalItems = data?.data?.total || 0;

  return (
    <div className="p-4">
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.totalAmount || 0}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        totalItems={totalItems}
        limit={limit}
        page={page}
        title="To'lovlar"
      >
        <Payment data={data?.data?.payload || []} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(PaymentHistory);
