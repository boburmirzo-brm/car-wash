import React, { useCallback, useMemo } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import { DatePicker, Space, Pagination, Button } from "antd";
import { useGetMyWashingsQuery } from "../../redux/api/car-washing";
import { CustomEmpty, MiniLoading } from "@/utils";
import CarWashing from "./CarWashing";
import { useParamsHook } from "@/hooks/useParamsHook";
import "./style.css";

const { RangePicker } = DatePicker;

const CarWashingHistory = () => {
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = getParam("page") || "1";
  const limit = "2";

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
      done: "1",
      page,
      limit,
    }),
    [fromDate, toDate, page]
  );

  const { data, isError, isFetching } = useGetMyWashingsQuery(filters);
  console.log(data);

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

  const handlePageChange = useCallback(
    (page: number) => {
      setParam("page", page.toString());
    },
    [setParam]
  );

  return (
    <div className="my-4 space-y-4">
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
      {isError ? (
        <CustomEmpty />
      ) : (
        <CarWashing profile={true} data={data?.data} />
      )}
      {isFetching && <MiniLoading/>}

      {!isError && (
        <div className="flex justify-end">
          <Pagination
            current={parseInt(page, 10)}
            pageSize={parseInt(limit, 10)}
            total={data?.data?.total}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(CarWashingHistory);
