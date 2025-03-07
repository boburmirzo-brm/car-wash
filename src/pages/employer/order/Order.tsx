import Search from "@/components/search/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { useParamsHook } from "@/hooks/useParamsHook";
import { useGetCarsQuery } from "@/redux/api/car";
import { useGetCustomersQuery } from "@/redux/api/customer";
import { Empty, Skeleton } from "antd";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Order = () => {
  const { getParam } = useParamsHook();
  let value = getParam("q") || "";
  const searchValue = useDebounce(value);
  const { pathname } = useLocation();
  const currentPathname = pathname.endsWith("/customer") ? "customer" : "";

  const {
    data: carData,
    isFetching: isCarFatching,
    isError: carIsError,
  } = useGetCarsQuery(
    { filter: searchValue },
    { skip: !searchValue || !value || currentPathname === "customer" }
  );

  const {
    data: customerData,
    isFetching: isCustomerFatching,
    isError: customerIsError,
  } = useGetCustomersQuery(
    { filter: searchValue },
    { skip: !searchValue || !value || currentPathname !== "customer" }
  );

  return (
    <div className="mt-4">
      <Search />

      {isCarFatching || isCustomerFatching ? (
        <div className="mt-4">
          <Skeleton active />
        </div>
      ) : (
        (carIsError || customerIsError || !value) && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      )}

      <Outlet
        context={{
          data: currentPathname === "customer" ? customerData : carData,
          show: Boolean(
            value &&
              !isCarFatching &&
              !isCustomerFatching &&
              (!carIsError || customerIsError) &&
              (carIsError || !customerIsError)
          ),
        }}
      />
    </div>
  );
};

export default React.memo(Order);
