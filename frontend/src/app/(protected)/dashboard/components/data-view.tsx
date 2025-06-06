import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BalanceBarChartMonthView,
  BalancePieChartMonthView,
} from "./balance-charts";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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

export default function DataSection() {
  const date = new Date();
  const [month, setMonth] = useState(MONTHS[date.getMonth()]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-500">Spending Trends</CardTitle>
          <Link
            href="/dashboard/charts"
            className={buttonVariants({ variant: "link" })}
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-500">
                Bar Chart: Spending Trends
              </CardTitle>
              <CardDescription>Monitor spending habits</CardDescription>
            </CardHeader>
            <CardContent>
              <BalanceBarChartMonthView />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-gray-500">
                    Pie Chart: Spending Trends
                  </CardTitle>
                  <CardDescription>Monitor spending habits</CardDescription>
                </div>
                <div>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jan">January</SelectItem>
                      <SelectItem value="Feb">February</SelectItem>
                      <SelectItem value="Mar">March</SelectItem>
                      <SelectItem value="Apr">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="Jun">June</SelectItem>
                      <SelectItem value="Jul">July</SelectItem>
                      <SelectItem value="Aug">August</SelectItem>
                      <SelectItem value="Sep">September</SelectItem>
                      <SelectItem value="Oct">October</SelectItem>
                      <SelectItem value="Nov">November</SelectItem>
                      <SelectItem value="Dec">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <BalancePieChartMonthView month={month} />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
