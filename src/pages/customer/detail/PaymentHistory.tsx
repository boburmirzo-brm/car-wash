import { useGetPaymentByCustomerIdQuery } from "@/redux/api/payment";
import React from "react";
import { useOutletContext } from "react-router-dom";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";
import Payment from "@/pages/payment/Payment";


interface ContextType {
  cars: any;
  customerId: string;
}

const PaymentHistory = () => {
  const { customerId } = useOutletContext<ContextType>();
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isError, isFetching, isLoading } = useGetPaymentByCustomerIdQuery(
    {
      customerId,
      params: filters,
    },
    { skip: !customerId }
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
        isLoading={isLoading}
        isFetching={isFetching}
        totalItems={totalItems}
        limit={limit}
        page={page}
        title="To'lovlar"
      >
        <Payment data={data?.data?.payload || []} />
      </DateWithPagination>
    </>
  );
};

export default React.memo(PaymentHistory);
