import React, { useCallback, useMemo } from "react";
import { useGetCustomersQuery } from "../../../redux/api/customer";
import { useParamsHook } from "../../../hooks/useParamsHook";
import { Button, DatePicker, Pagination, Skeleton, Select } from "antd";
import Box from "@/components/ui/Box";
import { PiBroom } from "react-icons/pi";
import Customer from "@/components/customer/Customer";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Customers = () => {
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

  const handleSortChange = useCallback(
    (value: string) => {
      if (value === "budget-asc") {
        setParam("sortBy", "budget");
        setParam("sortOrder", "asc");
      } else if (value === "budget-desc") {
        setParam("sortBy", "budget");
        setParam("sortOrder", "desc");
      } else {
        removeParam("sortBy");
        removeParam("sortOrder");
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

  const { data, isLoading } = useGetCustomersQuery(filters);

  return (
    <div>
      <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
        <div className="text-xl font-bold flex items-center gap-2 text-gray-700">
          <span>Mijozlar</span>
        </div>

        <div className="flex items-center max-[500px]:flex-wrap gap-2">
          <RangePicker
            popupClassName="custom-range-picker-dropdown"
            format="YYYY-MM-DD"
            className="max-[500px]:w-full"
            onChange={handleFilterChange}
          />
          <Select
            defaultValue="createdAt-desc"
            value={sortBy ? `${sortBy}-${sortOrder}` : "createdAt-desc"}
            onChange={handleSortChange}
            className="w-40"
          >
            <Option value="createdAt-desc">Eng yangi</Option>
            <Option value="budget-asc">Byudjet ⬆</Option>
            <Option value="budget-desc">Byudjet ⬇</Option>
          </Select>
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

      <Customer data={data?.data} />

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

export default React.memo(Customers);
