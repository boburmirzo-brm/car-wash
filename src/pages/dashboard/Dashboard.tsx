import React from "react";
import { useStatsQuery } from "@/redux/api/stats";
import Box from "@/components/ui/Box";
import { Outlet } from "react-router-dom";
import Tabs from "@/components/ui/Tabs";
import { fromToTime } from "@/helper";
import { useCheckTokenQuery } from "@/redux/api/auth";

const Dashboard = () => {
  const { data: profile } = useCheckTokenQuery(undefined);
  const { from, to } = fromToTime(profile?.user?.time || "", 0);
  const { data } = useStatsQuery({ fromDate: from, toDate: to });

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <Box className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-text text-xl font-bold">Statistika</h2>
        </Box>
        <div className="grid lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-3">
          <Box>
            <div className="flex flex-1 items-start justify-between">
              <h3 className="sm:text-2xl text-xl mb-2 font-medium text-text">
                {data?.data?.payload?.pendingTotal}
              </h3>
            </div>
            <p className="text-sm text-text-muted">Yuvilyotgan mashinalar</p>
          </Box>
          <Box>
            <div className="flex flex-1 items-start justify-between">
              <h3 className="sm:text-2xl text-xl mb-2 font-medium text-text">
                {data?.data?.payload?.completedTotal}
              </h3>
            </div>
            <p className="text-sm text-text-muted">Yuvilgan mashinalar</p>
          </Box>

          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-text">
                {data?.data?.payload?.totalExpense?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-text-muted">Xarajat</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-text">
                {data?.data?.payload?.employeeExpense?.toLocaleString() || "0"}{" "}
                UZS
              </h3>
            </div>
            <p className="text-sm text-text-muted">Ishchi maoshi</p>
          </Box>
          <Box>
            <div className="flex-1">
              <h3 className="sm:text-2xl text-xl  mb-2 font-medium text-success">
                {data?.data?.payload?.totalAmount?.toLocaleString() || "0"} UZS
              </h3>
            </div>
            <p className="text-sm text-text-muted">Kirim</p>
          </Box>
        </div>
      </div>
      <Tabs
        className="mx-4"
        items={[
          { title: "Jarayonda", path: "/", id: 0 },
          { title: "Tayyor", path: "/car-washing-done", id: 1 },
        ]}
      />

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
