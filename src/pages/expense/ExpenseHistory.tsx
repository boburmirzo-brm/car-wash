import { Button, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useGetAllExpenseQuery } from "../../redux/api/expense";
import Expense from "./Expense";
import ExpensePopup from "../../components/expense-popup/ExpensePopup";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

const { Option } = Select;

const ExpenseHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter();

  const { data, isError, isFetching, isLoading } =
    useGetAllExpenseQuery(filters);

  const totalItems = data?.data?.total || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleClose = useCallback((isBack?: boolean | undefined) => {
    setIsModalOpen(false);
    if (!isBack) window.history.back();
  }, []);

  const handleSortChange = useCallback(() => {}, []);

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
        title="Xarajatlar"
        extraOptions={
          <>
            <Select
              // defaultValue=""
              // value={}
              onChange={handleSortChange}
              className="w-40"
            >
              <Option value="">Hammasi</Option>
              <Option value="">Xarajat</Option>
              <Option value="">Maosh</Option>
            </Select>
            <Button onClick={handleAddExpense} type="primary">
              <PlusOutlined />
            </Button>
          </>
        }
      >
        <Expense data={data?.data?.payload || []} />
      </DateWithPagination>

      <ExpensePopup
        open={isModalOpen}
        onClose={handleClose}
        expense={selectedExpense || undefined}
        requiredComment={true}
        name={
          selectedExpense ? "Xarajatni tahrirlash" : "Yangi xarajat qo‘shish"
        }
      />
    </div>
  );
};

export default React.memo(ExpenseHistory);
