import { Pagination, Button, DatePicker } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useParamsHook } from "../../hooks/useParamsHook";
import { HistoryOutlined, PlusOutlined } from "@ant-design/icons";
import { CustomEmpty, MiniLoading } from "@/utils";
import { useGetAllExpenseQuery } from "../../redux/api/expense";
import Expense from "./Expense";
import ExpensePopup from "../../components/expense-popup/ExpensePopup";
import { PiBroom } from "react-icons/pi";

const { RangePicker } = DatePicker;

const ExpenseHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = parseInt(getParam("page") || "1", 10);
  const limit = 20;

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
      page,
      limit,
    }),
    [fromDate, toDate, page]
  );

  const handleFilterChange = useCallback(
    (dates: any) => {
      if (dates) {
        setParam("fromDate", dates[0].format("YYYY-MM-DD"));
        setParam("toDate", dates[1].format("YYYY-MM-DD"));
      } else {
        removeParam("fromDate");
        removeParam("toDate");
      }
    },
    [setParam, removeParam]
  );

  const clearFilters = useCallback(() => {
    removeParams(["fromDate", "toDate", "page"]);
  }, [removeParams]);

  const { data, isError, isFetching } = useGetAllExpenseQuery(filters);
  const totalItems = data?.data?.total || 0;

  const handlePageChange = useCallback(
    (newPage: any) => {
      setParam("page", newPage.toString());
    },
    [setParam]
  );

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between  items-center flex-wrap gap-4 p-4">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined />
          <span>Xarajat</span>
        </div>
        <div
          className="flex flex-wrap items-center gap-4 max-[700px]:order-3"
        >
          <div className="flex gap-2 items-center">
            <RangePicker
              popupClassName="custom-range-picker-dropdown "
              format="YYYY-MM-DD"
              onChange={handleFilterChange}
            />
            <Button type="default" onClick={clearFilters}>
              <PiBroom className="text-xl" />
            </Button>
          </div>
          <Button onClick={handleAddExpense} type="primary">
            <PlusOutlined /> Xarajat qo‘shish
          </Button>
        </div>
        <div className="min-[700px]:w-full text-right max-[700px]:order-2">
          <h3 className="text-2xl font-bold">1,360,000 UZS</h3>
        </div>
      </div>

      {isError && <CustomEmpty />}
      {!isError && <Expense data={data?.data?.payload || []} />}
      {isFetching && <MiniLoading />}
      {!isError && totalItems > limit && (
        <div className="flex justify-end mt-4">
          <Pagination
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}

      <ExpensePopup
        open={isModalOpen}
        onClose={handleCloseModal}
        expense={selectedExpense || undefined}
        name={
          selectedExpense ? "Xarajatni tahrirlash" : "Yangi xarajat qo‘shish"
        }
      />
    </>
  );
};

export default React.memo(ExpenseHistory);
