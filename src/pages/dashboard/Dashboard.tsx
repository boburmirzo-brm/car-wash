import { Button, Tag, DatePicker } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useMemo } from "react";
import { useStatsQuery } from "@/redux/api/stats";
import Box from "@/components/ui/Box";
import { NavLink, Outlet } from "react-router-dom";
import { useParamsHook } from "@/hooks/useParamsHook";
import { PiBroom } from "react-icons/pi";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();

  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
    }),
    [fromDate, toDate]
  );
  const { data } = useStatsQuery(filters);
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
  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <Box className="flex items-center justify-between flex-wrap gap-4">
          <Title level={4} style={{ marginBottom: 0 }}>
            Statistika
          </Title>
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
        </Box>
        <div className="grid lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-3">
          <Box>
            <div className="flex flex-1 items-start justify-between">
              <h3 className="sm:text-2xl text-xl mb-2 font-medium text-primary">
                {data?.data?.payload?.pendingTotal}
              </h3>
              <Tag color={"yellow"}>JARAYONDA</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilyotgan mashinalar</p>
          </Box>
          <Box>
            <div className="flex flex-1 items-start justify-between">
              <h3 className="sm:text-2xl text-xl mb-2 font-medium text-primary">
                {data?.data?.payload?.completedTotal}
              </h3>
              <Tag color={"green"}>TAYYOR</Tag>
            </div>
            <p className="text-sm text-gray-400">Yuvilgan mashinalar</p>
          </Box>

          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-primary">
                {data?.data?.payload?.totalExpense?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Xarajat</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-primary">
                {data?.data?.payload?.employeeExpense?.toLocaleString() || "0"}{" "}
                UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Ishchi maoshi</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-green-500">
                {data?.data?.payload?.totalAmount?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-gray-400">Kirim</p>
          </Box>
        </div>
      </div>
      <div className="mx-4 flex gap-6 border-b border-gray-200 pb-[0.5px]">
        <NavLink
          className={`hover:text-black text-gray-600 custom-tab-link`}
          to={"/"}
        >
          Jarayonda
        </NavLink>
        <NavLink
          className={`hover:text-black text-gray-600 custom-tab-link`}
          to={"/car-washing-done"}
        >
          Tayyor
        </NavLink>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
