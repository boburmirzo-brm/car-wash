import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { useParams } from "react-router-dom";
import { useGetPaymentByEmployeeIdQuery } from "@/redux/api/payment";
import Payment from "@/pages/payment/Payment";
import DateWithPagination from "@/components/ui/DateWithPagination";
import useFilter from "@/hooks/useFilter";

const EmployeePaymentHistory = () => {
  const { id } = useParams<{ id?: string }>();
  const employeeId = useSelector((state: RootState) => state.auth.id);
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isError, isFetching } = useGetPaymentByEmployeeIdQuery(
    {
      id: id || employeeId,
      params: filters,
    },
    { skip: !(id || employeeId) }
  );

  const totalItems = data?.data?.total || 0;

  return (
    <>
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.totalAmount || 0}
        isError={isError}
        isFetching={isFetching}
        totalItems={totalItems}
        limit={limit}
        page={page}
        title="Kirim"
      >
        <Payment data={data?.data?.payload || []} />
      </DateWithPagination>
    </>
  );
};

export default React.memo(EmployeePaymentHistory);
