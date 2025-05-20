import React, { useEffect } from "react";
import { useGetExpenseByEmployeeIdQuery } from "@/redux/api/expense";
import Expense from "@/pages/expense/Expense";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

const ExpenseHistory: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const employeeId = useSelector((state: RootState) => state.auth.id);
  const userId = id || employeeId;
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const filter = params.get("filter");

  // useEffect(() => {
  //   if (filter === "admin") {
  //     // filterga qarab ma'lumot olib kelish yoki filterlash
  //     console.log("Admin filter ishladi");
  //   }
  // }, [filter]);
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isFetching, isError, isLoading } =
    useGetExpenseByEmployeeIdQuery({
      id: userId,
      params: filters,
    });

  const totalItems = data?.data?.total || 0;

  return (
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
      title="Maosh"
    >
      <Expense data={data?.data?.payload} />
    </DateWithPagination>
  );
};

export default React.memo(ExpenseHistory);
