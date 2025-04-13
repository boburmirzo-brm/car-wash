import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
// import { useParamsHook } from "../../hooks/useParamsHook";
import { PlusOutlined } from "@ant-design/icons";
// import { CustomEmpty, MiniLoading } from "@/utils";
import { useGetAllExpenseQuery } from "../../redux/api/expense";
import Expense from "./Expense";
import ExpensePopup from "../../components/expense-popup/ExpensePopup";
// import { PiBroom } from "react-icons/pi";
// import { useCheckTokenQuery } from "@/redux/api/auth";
// import { fromToTime } from "@/helper";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

// const { RangePicker } = DatePicker;

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

  // const { getParam, setParam, removeParam, removeParams } = useParamsHook();
  // const { data: profile } = useCheckTokenQuery(undefined);
  // const { from, to } = fromToTime(profile?.user?.time || "", 10);
  // const fromDate = getParam("fromDate") || from;
  // const toDate = getParam("toDate") || to;
  // const page = parseInt(getParam("page") || "1", 10);
  // const limit = 20;
  // const filters = useMemo(
  //   () => ({
  //     fromDate,
  //     toDate,
  //     page,
  //     limit,
  //   }),
  //   [fromDate, toDate, page]
  // );
  // const handleFilterChange = useCallback(
  //   (dates: any) => {
  //     if (dates) {
  //       setParam("fromDate", dates[0].format("YYYY-MM-DD"));
  //       setParam("toDate", dates[1].format("YYYY-MM-DD"));
  //     } else {
  //       removeParam("fromDate");
  //       removeParam("toDate");
  //     }
  //   },
  //   [setParam, removeParam]
  // );
  // const clearFilters = useCallback(() => {
  //   removeParams(["fromDate", "toDate", "page"]);
  // }, [removeParams]);
  // const handlePageChange = useCallback(
  //   (newPage: any) => {
  //     setParam("page", newPage.toString());
  //   },
  //   [setParam]
  // );

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
          <Button onClick={handleAddExpense} type="primary">
            <PlusOutlined />
          </Button>
        }
      >
        <Expense data={data?.data?.payload || []} />
      </DateWithPagination>
      {/* <div className="flex justify-between  items-center flex-wrap gap-4 p-4">
        <div className="text-xl font-bold flex items-center gap-2 text-text-muted">
          <HistoryOutlined />
          <span>Xarajat</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 max-[700px]:order-3">
          <div className="flex gap-2 items-center">
            <RangePicker
              popupClassName="custom-range-picker-dropdown "
              format="YYYY-MM-DD"
              onChange={handleFilterChange}
            />
            <Button type="default" onClick={clearFilters}>
              <PiBroom className="text-xl" />
            </Button>
            <Button onClick={handleAddExpense} type="primary">
              <PlusOutlined />
            </Button>
          </div>
        </div>
        <div className="min-[700px]:w-full text-right max-[700px]:order-2">
          <h3 className="text-2xl font-bold">
            {isError ? 0 : data?.data?.totalAmount.toLocaleString()} UZS
          </h3>
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
      )} */}

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
