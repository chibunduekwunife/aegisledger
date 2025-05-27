import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BudgetRemaining, totalSpent } from "@/lib/seed";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { fetchUserInfo } from "@/api/user";

export default function BalancesSection() {
  // get rid of seed data and functions
  const [username, setUsername] = useState<string>('');

  // Fetch user info on mount
  useEffect(() => {
    fetchUserInfo().then((user) => {
      if (user && user.username) {
        setUsername(user.username);
      }
    });
  }, []);

  const budget = 5000;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Hello, {username}!</CardTitle>
        <CardTitle className="text-gray-500">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card>
            <CardHeader>
              <CardDescription>Total Spent</CardDescription>
              <CardTitle
                className={clsx(
                  "text-2xl font-bold",
                  totalSpent() < 0 ? "text-expense" : "text-income"
                )}
              >
                {`$${totalSpent()}`}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Remaining Budget</CardDescription>
              <CardTitle
                className={clsx(
                  "text-2xl font-bold",
                  BudgetRemaining(budget) < 0 ? "text-expense" : "text-income"
                )}
              >
                {`$${BudgetRemaining(budget)}`}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Net Savings</CardDescription>
              <CardTitle
                className={clsx(
                  "text-2xl font-bold",
                  BudgetRemaining(budget) < 0 ? "text-expense" : "text-income"
                )}
              >
                {`$${BudgetRemaining(budget)}`}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
