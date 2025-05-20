import React, { useCallback, useEffect } from "react";
import { useGetAllPaymentQuery } from "@/redux/api/payment";
import Payment from "./Payment";
import DateWithPagination from "@/components/ui/DateWithPagination";
import useFilter from "@/hooks/useFilter";
import { Select } from "antd";
import { useParamsHook } from "@/hooks/useParamsHook";

const { Option } = Select;

const PaymentHistory = () => {
  const { setParam, removeParam } = useParamsHook();
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
  const handleTypeChange = useCallback(
    (value: string) => {
      if (value === "CASH") {
        setParam("type", "CASH");
      } else if (value === "CARD") {
        setParam("type", "CARD");
      } else {
        removeParam("type");
      }
      setParam("page", "1")
    },
    [setParam, removeParam]
  );
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
        extraOptions={
          <>
            <Select
              defaultValue=""
              value={filters.type}
              onChange={handleTypeChange}
              className="w-40"
            >
              <Option value="">Hammasi</Option>
              <Option value="CARD">Karta</Option>
              <Option value="CASH">Naqt</Option>
            </Select>
          </>
        }
      >
        <Payment data={data?.data?.payload || []} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(PaymentHistory);
