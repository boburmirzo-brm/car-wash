import React, { useCallback, useMemo } from "react";
import { useGetCarsQuery } from "../../../redux/api/car";
import CarsView from "../../../components/cars-view/CarsView";
import { useParamsHook } from "../../../hooks/useParamsHook";
import { Button, DatePicker, Pagination, Skeleton } from "antd";
import { PiBroom } from "react-icons/pi";
import Box from "../../../components/ui/Box";
import { CustomEmpty } from "../../../utils";
const { RangePicker } = DatePicker;

const Cars = () => {
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";
  const page = getParam("page") || "1";
  const limit = "20";
  const sortBy = getParam("sortBy");
  const sortOrder = getParam("sortOrder");

  const filters = useMemo(() => {
    let query: any = { fromDate, toDate, page, limit };

    if (sortBy && sortOrder) {
      query.sortBy = sortBy;
      query.sortOrder = sortOrder;
    }

    return query;
  }, [fromDate, toDate, page, limit, sortBy, sortOrder]);

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
    removeParams(["fromDate", "toDate", "page", "sortBy", "sortOrder"]);
  }, [removeParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      setParam("page", page.toString());
    },
    [setParam]
  );
  const { data, isLoading } = useGetCarsQuery(filters);
  const cars = data?.data?.payload || [];
  console.log(cars);
  

  return (
    <div>
      <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <span>Mashinalar</span>
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
      {cars.length > 0 ? <CarsView data={cars} /> : <CustomEmpty />}

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

export default React.memo(Cars);
