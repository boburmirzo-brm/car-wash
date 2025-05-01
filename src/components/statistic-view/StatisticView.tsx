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
          onClick={() => navigate(`/expense${search + (data?.totalExpense ? `&filter=expense` : "")}`)}
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
          onClick={() => navigate(`/expense${search + (data?.totalExpense ? `&filter=salary` : "")}`)}
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


// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// interface Props {
//   data: {
//     pendingTotal: number;
//     completedTotal: number;
//     totalAmount: number;
//     totalExpense: number;
//     employeeExpense: number;
//     totalExpenseSum: number;
//   };
//   title?: string;
//   hiddenDate?: boolean;
// }

// const expenseColors = ["#FF8042", "#FFBB28"];
// const profitColors = ["#00C49F", "#FF4444"];

// const formatNumber = (num: number) => num.toLocaleString("uz-UZ");

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-2 rounded shadow text-sm">
//         <p className="font-semibold">{label}</p>
//         <p>{formatNumber(payload[0].value)} so‘m</p>
//       </div>
//     );
//   }
//   return null;
// };

// const StatisticView: React.FC<Props> = ({
//   data,
//   hiddenDate = false,
//   title,
// }) => {
//   console.log(data);
  
//   const {
//     pendingTotal,
//     completedTotal,
//     totalAmount,
//     totalExpense,
//     employeeExpense,
//     totalExpenseSum,
//   } = data;

//   const barData = [
//     { name: "Jarayonda", value: pendingTotal },
//     { name: "Yakunlangan", value: completedTotal },
//   ];

//   const pieData = [
//     { name: "Xodim xarajatlari", value: employeeExpense },
//     { name: "Boshqa xarajatlar", value: totalExpense },
//   ];

//   const profitData = [
//     { name: "Daromad", value: totalAmount },
//     { name: "Umumiy xarajat", value: totalExpenseSum },
//   ];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Bar chart: Mashina holatlari */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
//         {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
//         {!hiddenDate && (
//           <p className="text-sm text-gray-500 mb-4">
//             {new Date().toLocaleDateString("uz-UZ")}
//           </p>
//         )}
//         <h3 className="text-lg font-semibold mb-4">
//           Mashina Holatlari ({pendingTotal + completedTotal} ta)
//         </h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={barData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis allowDecimals={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Pie chart: Xarajatlar */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
//         <h3 className="text-lg font-semibold mb-4">Xarajatlar Taqqoslash</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <Pie
//               data={pieData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {pieData.map((_, index) => (
//                 <Cell
//                   key={`cell-expense-${index}`}
//                   fill={expenseColors[index % expenseColors.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Bar chart: Daromad vs Xarajat */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
//         <h3 className="text-lg font-semibold mb-4">Daromad vs Xarajatlar</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={profitData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis allowDecimals={false} />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar dataKey="value" radius={[6, 6, 0, 0]}>
//               {profitData.map((_, index) => (
//                 <Cell
//                   key={`cell-profit-${index}`}
//                   fill={profitColors[index % profitColors.length]}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default StatisticView;
