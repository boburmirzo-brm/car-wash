import React, { useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DatePicker, Button } from "antd";
import { PiBroom } from "react-icons/pi";
import Box from "../ui/Box";
import { useParamsHook } from "../../hooks/useParamsHook";

// interface ChartData {
//   name: string;
//   value: number;
// }

interface StatisticData {
  pendingTotal: number;
  completedTotal: number;
  totalAmount: number;
  totalExpense: number;
  employeeExpense: number;
  totalExpenseSum: number;
}

interface StatisticBarCharProps {
  data?: StatisticData;
  title?: string;
  hiddenDate?: boolean;
}

const { RangePicker } = DatePicker;

const DEFAULT_DATA: StatisticData = {
  pendingTotal: 0,
  completedTotal: 0,
  totalAmount: 0,
  totalExpense: 0,
  employeeExpense: 0,
  totalExpenseSum: 0,
};

const EXPENSE_COLORS = ["#FF8042", "#FFBB28"];
const PROFIT_COLORS = ["#00C49F", "#FF4444"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  const { name, value } = payload[0];
  const isStatus = ["Yakunlangan", "Jarayonda"].includes(name.trim());

  return (
    <div className="rounded bg-white p-2 shadow text-sm">
      <p className="font-semibold">{label}</p>
      <p>
        {isStatus ? value.toLocaleString() : `${value.toLocaleString()} UZS`}
      </p>
    </div>
  );
};

const formatChartData = (data: StatisticData) => ({
  barData: [
    { name: "Jarayonda", value: data.pendingTotal },
    { name: "Yakunlangan", value: data.completedTotal },
  ],
  pieData: [
    { name: "Xodim xarajatlari", value: data.employeeExpense },
    { name: "Boshqa xarajatlar", value: data.totalExpense },
  ],
  profitData: [
    { name: "Daromad", value: data.totalAmount },
    { name: "Umumiy xarajat", value: data.totalExpenseSum },
  ],
});

const StatisticBarChar: React.FC<StatisticBarCharProps> = ({
  data = DEFAULT_DATA,
  title,
  hiddenDate = false,
}) => {
  const { setParam, removeParam, removeParams } = useParamsHook();
  const { barData, pieData, profitData } = formatChartData(data);

  const handleFilterChange = useCallback(
    (dates: any) => {
      if (dates?.length === 2) {
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
    <div className="flex flex-col gap-4 p-4">
      <Box className="flex flex-wrap items-center justify-between gap-4">
        {title && <h2 className="text-xl font-bold text-text">{title}</h2>}
        {hiddenDate && (
          <div className="flex gap-2">
            <RangePicker
              className="custom-range-picker"
              format="YYYY-MM-DD"
              onChange={handleFilterChange}
            />
            <Button
              type="default"
              onClick={clearFilters}
              icon={<PiBroom className="text-xl" />}
              aria-label="Clear filters"
            />
          </div>
        )}
      </Box>

      <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
        {!hiddenDate && (
          <p className="mb-4 text-sm text-gray-500">
            {new Date().toLocaleDateString("uz-UZ")}
          </p>
        )}
        <h3 className="mb-4 text-lg font-semibold">
          Mashina Holatlari ({data.pendingTotal + data.completedTotal} ta)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Xarajatlar Taqqoslash</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`expense-cell-${index}`}
                  fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Daromad vs Xarajatlar</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              allowDecimals={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {profitData.map((_, index) => (
                <Cell
                  key={`profit-cell-${index}`}
                  fill={PROFIT_COLORS[index % PROFIT_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(StatisticBarChar);
