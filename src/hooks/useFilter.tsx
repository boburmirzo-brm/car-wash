import { useCheckTokenQuery } from "@/redux/api/auth";
import { useParamsHook } from "./useParamsHook";
import { fromToTime } from "@/helper";
import { useCallback, useMemo } from "react";

const useFilter = (beforeDays: number = 0, allTime: boolean = false, limitAmount: number = 20) => {
  const { getParam, setParam, removeParam, removeParams } = useParamsHook();
  const { data: profile } = useCheckTokenQuery(undefined);
  const { from, to } = fromToTime(profile?.user?.time || "", beforeDays);

  const fromDate = getParam("fromDate") || (allTime ? "" : from);
  const toDate = getParam("toDate") || (allTime ? "" : to);
  const page = parseInt(getParam("page") || "1", 10);
  const filter = getParam("filter") || "";
  const bonus = getParam("bonus") || "";
  const type = getParam("type") || "";
  const limit = limitAmount;

  const filters = useMemo(
    () => ({
      fromDate,
      toDate,
      page,
      limit,
      filter,
      bonus,
      type
    }),
    [fromDate, toDate, page, filter, type,bonus]
  );

  const handleFilterChange = useCallback(
    (dates: any) => {    
      if (typeof dates[0] === "object" && dates) {
        setParam("fromDate", dates[0].format("YYYY-MM-DD"));
        setParam("toDate", dates[1].format("YYYY-MM-DD"));
      } else if(typeof dates[0] === "string"){
        setParam("fromDate", dates[0]);
        setParam("toDate", dates[1]);
      } else {
        removeParam("fromDate");
        removeParam("toDate");
      }
    },
    [setParam, removeParam]
  );

  const clearFilters = useCallback(() => {
    removeParams(["fromDate", "toDate", "page", "filter", "type", "bonus"]);
  }, [removeParams]);

  const handlePageChange = useCallback(
    (newPage: any) => {
      setParam("page", newPage.toString());
    },
    [setParam]
  );
  return {
    filters,
    page,
    limit,
    handleFilterChange,
    clearFilters,
    handlePageChange,
  };
};

export default useFilter;
