import React from "react";
import { useStatsQuery } from "@/redux/api/stats";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";
import { fromToTime } from "@/helper";
import { useCheckTokenQuery } from "@/redux/api/auth";
import StatisticView from "@/components/statistic-view/StatisticView";

const Dashboard = () => {
  const { data: profile } = useCheckTokenQuery(undefined);
  const { from, to } = fromToTime(profile?.user?.time || "", 0);
  const { data } = useStatsQuery({ fromDate: from, toDate: to });
  return (
    <>
      <StatisticView title="Bugungi statistika" data={data?.data?.payload} />
      <Tabs
        className="mx-4"
        items={[
          { title: "Jarayonda", path: "/", id: 0 },
          { title: "Tayyor", path: "/car-washing-done", id: 1 },
          { title: "Bonus", path: "/car-washing-bonus", id: 2 },
        ]}
      />

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
