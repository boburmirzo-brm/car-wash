import Search from "@/components/search/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { useParamsHook } from "@/hooks/useParamsHook";
import { useGetCarsQuery } from "@/redux/api/car";
import { useGetCustomersQuery } from "@/redux/api/customer";
import { CustomEmpty } from "@/utils";
import { Skeleton } from "antd";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";

const Order = () => {
  const { getParam } = useParamsHook();
  let value = getParam("q") || "";
  const searchValue = useDebounce(value.replace(/\s/gi, ""));
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

  let startedView = (
    <div className="text-center my-8 text-gray-300">
      <FileTextOutlined className="text-4xl " />
      <p className="text-sm mt-2 text-gray-400">Biror nima yozing</p>
    </div>
  );
  return (
    <div className="mt-4">
      <Search />

      {isCarFatching || isCustomerFatching ? (
        <div className="mt-4">
          <Skeleton active />
        </div>
      ) : !value ? (
        startedView
      ) : (
        (carIsError || customerIsError || !value) && <CustomEmpty />
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
