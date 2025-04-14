import React, { useCallback, useEffect, useMemo } from "react";
import { useGetCustomersQuery } from "@/redux/api/customer";
import { useParamsHook } from "@/hooks/useParamsHook";
import { Select } from "antd";
import Customer from "@/components/customer/Customer";
import useFilter from "@/hooks/useFilter";
import DateWithPagination from "@/components/ui/DateWithPagination";

const { Option } = Select;

const Customers = () => {
  const { getParam, setParam, removeParam } = useParamsHook();

  const {
    clearFilters,
    filters,
    handleFilterChange,
    handlePageChange,
    limit,
    page,
  } = useFilter(0, true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const q = getParam("q") || "";
  const sortBy = getParam("sortBy");
  const sortOrder = getParam("sortOrder");

  const filtersSort = useMemo(() => {
    let query: any = { page, limit };
    if (sortBy && sortOrder) {
      query.sortBy = sortBy;
      query.sortOrder = sortOrder;
    }
    return query;
  }, [page, limit, sortBy, sortOrder]);

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

  const { data, isLoading, isError, isFetching } = useGetCustomersQuery({
    ...filters,
    ...filtersSort,
    filter: q
  });

  return (
    <div className="mt-4">
      <DateWithPagination
        clearFilters={clearFilters}
        handleFilterChange={handleFilterChange}
        handlePageChange={handlePageChange}
        totalAmount={data?.data?.total || 0}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        totalItems={data?.data?.total || 0}
        limit={limit}
        page={page}
        suffix={"ta"}
        extraOptions={
          <>
            <Select
              defaultValue="createdAt-desc"
              value={sortBy ? `${sortBy}-${sortOrder}` : "createdAt-desc"}
              onChange={handleSortChange}
              className="w-40"
            >
              <Option value="createdAt-desc">Eng yangi</Option>
              <Option value="budget-asc">Qarzdorlar ⬇</Option>
              <Option value="budget-desc">Haqdorlar ⬆</Option>
            </Select>
          </>
        }
        title="Mijozlar"
      >
        <Customer data={data?.data} />
      </DateWithPagination>
    </div>
  );
};

export default React.memo(Customers);
