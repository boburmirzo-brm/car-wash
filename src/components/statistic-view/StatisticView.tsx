import React, { FC, useCallback } from "react";
import Box from "../ui/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, DatePicker } from "antd";
import { useParamsHook } from "@/hooks/useParamsHook";
import { PiBroom } from "react-icons/pi";

const { RangePicker } = DatePicker;

interface Props {
  data: any;
  hiddenDate?: boolean;
  title: string;
}

const StatisticView: FC<Props> = ({ data, hiddenDate = false, title }) => {
  const { setParam, removeParam , removeParams} = useParamsHook();
  const navigate = useNavigate();
  const { search } = useLocation();
  console.log(search);

  const handleFilterChange = useCallback(
    (dates: any) => {
      if (typeof dates[0] === "object" && dates) {
        setParam("fromDate", dates[0].format("YYYY-MM-DD"));
        setParam("toDate", dates[1].format("YYYY-MM-DD"));
      } else if (typeof dates[0] === "string") {
        setParam("fromDate", dates[0]);
        setParam("toDate", dates[1]);
      } else {
        removeParam("fromDate");
        removeParam("toDate");
      }
    },
    [setParam, removeParam]
  );
  const clearFilters =  useCallback(() => {
    removeParams(["fromDate", "toDate", "page"]);
  }, [removeParams]);
  return (
    <div className="p-4 flex flex-col gap-4">
      <Box className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-text text-xl font-bold">{title}</h2>
        {hiddenDate && (
          <div className="flex gap-2">
            <RangePicker
              popupClassName="custom-range-picker-dropdown"
              format="YYYY-MM-DD"
              onChange={handleFilterChange}
            />
            <Button type="default" onClick={clearFilters}>
              <PiBroom className="text-xl" />
            </Button>
          </div>
        )}
      </Box>
      <div className="grid lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-3">
        <Box className="cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex flex-1 items-start justify-between">
            <h3 className="sm:text-2xl text-xl mb-2 font-medium text-text">
              {data?.pendingTotal}
            </h3>
          </div>
          <p className="text-sm text-text-muted">Yuvilyotgan mashinalar</p>
        </Box>
        <Box
          className="cursor-pointer"
          onClick={() => navigate(`/car-washing-done${search}`)}
        >
          <div className="flex flex-1 items-start justify-between">
            <h3 className="sm:text-2xl text-xl mb-2 font-medium text-text">
              {data?.completedTotal}
            </h3>
          </div>
          <p className="text-sm text-text-muted">Yuvilgan mashinalar</p>
        </Box>

        <Box
          className="cursor-pointer"
          onClick={() => navigate(`/expense${search}`)}
        >
          <div className="flex-1">
            <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-text">
              {data?.totalExpense?.toLocaleString() || "0"} UZS
            </h3>
          </div>
          <p className="text-sm text-text-muted">Xarajat</p>
        </Box>
        <Box
          className="cursor-pointer"
          onClick={() => navigate(`/expense${search}`)}
        >
          <div className="flex-1">
            <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-text">
              {data?.employeeExpense?.toLocaleString() || "0"} UZS
            </h3>
          </div>
          <p className="text-sm text-text-muted">Ishchi maoshi</p>
        </Box>
        <Box
          className="cursor-pointer"
          onClick={() => navigate(`/payment${search}`)}
        >
          <div className="flex-1">
            <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-success">
              {data?.totalAmount?.toLocaleString() || "0"} UZS
            </h3>
          </div>
          <p className="text-sm text-text-muted">Kirim</p>
        </Box>
      </div>
    </div>
  );
};

export default React.memo(StatisticView);
