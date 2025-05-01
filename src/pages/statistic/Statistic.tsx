// import StatisticView from "@/components/statistic-view/StatisticView";
import { fromToTime } from "@/helper";
import { useParamsHook } from "@/hooks/useParamsHook";
import { useCheckTokenQuery } from "@/redux/api/auth";
import { useStatsQuery } from "@/redux/api/stats";
import React from "react";
import StatisticBarChar from "../../components/statistic-view/StatisticBarChar";

const Statistic = () => {
  const { getParam } = useParamsHook();
  const { data: profile } = useCheckTokenQuery(undefined);
  const { from, to } = fromToTime(profile?.user?.time || "", 0);
  const fromDate = getParam("fromDate") || from;
  const toDate = getParam("toDate") || to;
  const { data } = useStatsQuery({ fromDate, toDate });
  console.log();
  
  return (
    <div>
      <StatisticBarChar title="Statistika" hiddenDate={true} data={data?.data?.payload} />
    </div>
  );
};

export default React.memo(Statistic);
