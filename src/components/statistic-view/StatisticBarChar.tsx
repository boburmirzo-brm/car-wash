import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Box from "../ui/Box";
import { useParamsHook } from "@/hooks/useParamsHook";

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
}

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
  expenseData: [
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
}) => {
  const { expenseData, profitData } = formatChartData(data);
  const { getParam } = useParamsHook();
  const fromDate = getParam("fromDate") || "";
  const toDate = getParam("toDate") || "";

  return (
    <div className="flex flex-col gap-4 p-4">
      <Box className="flex flex-wrap items-center justify-between gap-4">
        {title && <h2 className="text-xl font-bold text-text">{title}</h2>}
      </Box>
      <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
        {fromDate && toDate && (
          <p className="mb-4 text-sm text-gray-500">
            {fromDate?.dateFormat()} / {toDate?.dateFormat()}
          </p>
        )}
        <h3 className="mb-4 text-lg font-semibold">Daromad vs Xarajatlar</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              allowDecimals={false}
              tickFormatter={(value) => value.reduceNumber()}
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

      <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Xarajatlar Taqqoslash</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={expenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              allowDecimals={false}
              tickFormatter={(value) => value.reduceNumber()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]}>
              {expenseData.map((_, index) => (
                <Cell
                  key={`profit-cell-${index}`}
                  fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
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
