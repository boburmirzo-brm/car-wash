import CarWashing from "@/components/car-washing/CarWashing";
import Box from "@/components/ui/Box";
import { useGetByEmployeeIdQuery } from "@/redux/api/car-washing";
import { Button, DatePicker, Pagination, Skeleton } from "antd";
import React, { useCallback, useMemo } from "react";
import { PiBroom } from "react-icons/pi";
import { useParamsHook } from "../../../hooks/useParamsHook";
import { useParams } from "react-router-dom";

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
      userId: id,
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

  const { data, isLoading } = useGetByEmployeeIdQuery(filters);

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <span>Car Wash History</span>
        </div>
        <div className="flex items-center gap-2">
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            onChange={handleFilterChange}
          />
          <Button type="default" onClick={clearFilters}>
            <PiBroom className="text-xl" />
          </Button>
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
    </div>
  );
};

export default React.memo(CarWahingProgress);
