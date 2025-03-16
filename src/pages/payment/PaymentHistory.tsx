import { Pagination, Space, Button, DatePicker } from "antd";
import React, { useCallback, useMemo } from "react";
import { useParamsHook } from "../../hooks/useParamsHook";
import { HistoryOutlined } from "@ant-design/icons";
import { CustomEmpty, MiniLoading } from "@/utils";
import { useGetAllPaymentQuery } from "../../redux/api/payment";
import Payment from "./Payment";

const { RangePicker } = DatePicker;

const PaymentHistory = () => {
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = parseInt(getParam("page") || "1", 10);
  const limit = 2;

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
      page,
      limit,
    }),
    [fromDate, toDate, page]
  );

  console.log(filters);

  const handleFilterChange = useCallback(
    (dates:any) => {
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

  const { data, isError, isFetching } = useGetAllPaymentQuery(filters);
  const totalItems = data?.data?.total || 0;
  console.log("DATAA",data);
  

  const handlePageChange = useCallback(
    (newPage:any) => {
      setParam("page", newPage.toString());
    },
    [setParam]
  );

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 m-4">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined />
          <span>Tarix</span>
        </div>
        <Space direction="horizontal" className="flex items-center gap-4">
          <span className="font-semibold">Sana oralig'i:</span>
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            onChange={handleFilterChange}
          />
          <Button type="primary" onClick={clearFilters}>
            Tozalash
          </Button>
        </Space>
      </div>

      {isError && <CustomEmpty />}
      {!isError && <Payment data={data?.data?.payload || []} />}
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
    </>
  );
};

export default React.memo(PaymentHistory);
