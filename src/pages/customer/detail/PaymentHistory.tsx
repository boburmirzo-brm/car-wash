import PaymentView from "@/components/payment/PaymentView";
import { useGetPaymentByCustomerIdQuery } from "@/redux/api/payment";
import { Pagination, Space, Button, DatePicker } from "antd";
import React, { useCallback, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { useParamsHook } from "../../../hooks/useParamsHook";
import { HistoryOutlined } from "@ant-design/icons";
import { CustomEmpty, MiniLoading } from "@/utils";

const { RangePicker } = DatePicker;

interface ContextType {
  cars: any;
  customerId: string;
}

const PaymentHistory = () => {
  const { customerId } = useOutletContext<ContextType>();
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = parseInt(getParam("page") || "1", 10);
  const limit = 5;

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

  const { data, isError, isFetching } = useGetPaymentByCustomerIdQuery(
    {
      customerId,
      params: filters,
    },
    { skip: !customerId }
  );

  const totalItems = data?.data?.total || 0;

  const handlePageChange = useCallback(
    (newPage: number) => {
      setParam("page", newPage.toString());
    },
    [setParam]
  );

  return (
    <>
      <div className="flex justify-between items-start max-[600px]:gap-4 max-[600px]:flex-col">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined />
          <span>Tarix</span>
        </div>
        <Space direction="vertical">
          <span className="font-semibold">Sana oralig'i:</span>
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            onChange={handleFilterChange}
          />
          <Button type="primary" block onClick={clearFilters}>
            Tozalash
          </Button>
        </Space>
      </div>
      {isError && <CustomEmpty />}
      {
        !isError && (
          <PaymentView data={data?.data?.payload || []} />
        )
      }
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
