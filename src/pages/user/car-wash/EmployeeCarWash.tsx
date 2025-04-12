import CarWashing from "@/components/car-washing/CarWashing";
import Box from "@/components/ui/Box";
import { useGetByEmployeeIdQuery } from "@/redux/api/car-washing";
import { Button, DatePicker, Pagination, Skeleton } from "antd";
import React, { useCallback, useMemo } from "react";
import { PiBroom } from "react-icons/pi";
import { useParamsHook } from "../../../hooks/useParamsHook";
import { useParams } from "react-router-dom";
import { HistoryOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const CarWahingProgress = () => {
  const { id } = useParams();
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = getParam("page") || "1";
  const limit = "20";

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
      page,
      limit,
    }),
    [fromDate, toDate, page, limit]
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

  const handlePageChange = useCallback(
    (page: number) => {
      setParam("page", page.toString());
    },
    [setParam]
  );

  const { data, isLoading, isError } = useGetByEmployeeIdQuery({
    id: id,
    params: filters,
  });

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <HistoryOutlined />
          <span>Kirim</span>
        </div>
        <div className="flex items-center gap-2 max-[600px]:order-3">
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            onChange={handleFilterChange}
          />
          <Button type="default" onClick={clearFilters}>
            <PiBroom className="text-xl" />
          </Button>
        </div>
        <div className="min-[600px]:w-full text-right max-[600px]:order-2">
          <h3 className="text-2xl font-bold">
            {isError ? "0" : data?.data?.totalAmount.toLocaleString()} UZS
          </h3>
        </div>
      </div>
      {isLoading && (
        <Box className="mt-4">
          <Skeleton active />
        </Box>
      )}
      <CarWashing data={data?.data} />

      <div className="flex justify-end">
        <Pagination
          current={parseInt(page, 10)}
          pageSize={parseInt(limit, 10)}
          total={data?.data?.total}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default React.memo(CarWahingProgress);
