"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { type ChartDatum } from "@/lib/types";
import { getTransactionsPromise } from "@/lib/utils";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FileDownIcon } from "lucide-react";

type Transaction = {
  date: string;
  amount: number;
  type: string;
  // add other fields as needed
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function groupByMonth(transactions: Transaction[]) {
  const data = Array(12)
    .fill(0)
    .map((_, i) => ({
      month: MONTHS[i],
      income: 0,
      expense: 0,
    }));

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const monthIdx = date.getMonth();
    const type = txn.type.toLowerCase(); // normalize to lowercase
    if (type === "income") {
      data[monthIdx].income += Number(txn.amount);
    } else if (type === "expense") {
      data[monthIdx].expense += Number(txn.amount);
    }
  });

  return data;
}

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--income)",
  },
  expense: {
    label: "Expense",
    color: "var(--expense)",
  },
} satisfies ChartConfig;

export function BalanceBarChartMonthView() {
  const [chartData, setChartData] = useState<ChartDatum[]>([]);

  useEffect(() => {
    getTransactionsPromise().then((transactions) => {
      console.log("Fetched transactions", transactions);
      const grouped = groupByMonth(transactions);
      setChartData(grouped);
    });
  }, []);

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={2} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={2} />
      </BarChart>
    </ChartContainer>
  );
}

type BalancePieChartMonthViewProps = {
  month: string;
};

export function BalancePieChartMonthView({
  month,
}: BalancePieChartMonthViewProps) {
  const [chartData, setChartData] = useState<ChartDatum[]>([]);

  useEffect(() => {
    getTransactionsPromise().then((transactions) => {
      const grouped = groupByMonth(transactions);
      setChartData(grouped);
    });
  }, []);

  const monthData = chartData.find((d) => d.month === month);

  const hasData =
    monthData && (monthData.income > 0 || monthData.expense > 0);

  const pieData = hasData
    ? [
        { name: "Income", value: monthData!.income },
        { name: "Expense", value: monthData!.expense },
      ]
    : [{ name: "No Data", value: 1 }];

  const COLORS = hasData
    ? ["var(--income)", "var(--expense)"]
    : ["#d1d5db"]; // Tailwind gray-300

  return (
    <ChartContainer config={chartConfig}>
      <PieChart width={250} height={250} accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          label
        >
          {pieData.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
          ))}
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={18}
          fontWeight={600}
          fill="#333"
        >
          {month}
        </text>
      </PieChart>
    </ChartContainer>
  );
}
