import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { fetchUserInfo } from "@/api/user";
import { getTransactionsPromise } from "@/lib/utils";
import { Transaction } from "@/lib/types";

export default function BalancesSection() {
  // get rid of seed data and functions
  const [username, setUsername] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch user info on mount
  useEffect(() => {
    //if user is authenticated
    fetchUserInfo().then((user) => {
      if (user && user.username) {
        setUsername(user.username);
      }
      getTransactionsPromise().then(setTransactions);
    });
  }, []);

  const networth = (txnArray: Transaction[]) => {
    let net_worth = 0;
    txnArray.forEach((txn) => {
      const amount = Number(txn.amount) || 0;
      if (txn.type === "Income") {
        net_worth += amount;
      } else if (txn.type === "Expense") {
        net_worth -= amount;
      }
    });
    return net_worth;
  };

  const totalIncome = (txnArray: Transaction[]) => {
    let total_income = 0;

    txnArray.forEach((txn) => {
      const amount = Number(txn.amount) || 0;
      if (txn.type === "Income") {
        total_income += amount;
      }
    });

    return total_income;
  };

  const totalExpense = (txnArray: Transaction[]) => {
    let total_expense = 0;

    txnArray.forEach((txn) => {
      const amount = Number(txn.amount) || 0;
      if (txn.type === "Expense") {
        total_expense -= amount;
      }
    });

    return total_expense;
  };

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
              <CardDescription>Net Worth</CardDescription>
              <CardTitle
                className={clsx(
                  "text-2xl font-bold",
                  transactions.length === 0
                    ? "text-gray-600 font-light"
                    : Math.floor(networth(transactions)) < 0
                    ? "text-expense"
                    : "text-income"
                )}
              >
                {transactions.length === 0
                  ? "---"
                  : `$${Math.floor(networth(transactions))}`}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Income</CardDescription>
              <CardTitle
                className={clsx(
                  "text-2xl font-bold",
                  transactions.length === 0
                    ? "text-gray-600 font-light"
                    : Math.floor(totalIncome(transactions)) < 0
                    ? "text-expense"
                    : "text-income"
                )}
              >
                {transactions.length === 0
                  ? "---"
                  : `$${Math.floor(totalIncome(transactions))}`}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Expense</CardDescription>
              <CardTitle
                className={clsx(
                  "text-2xl font-bold",
                  transactions.length === 0
                    ? "text-gray-600 font-light"
                    : Math.floor(totalExpense(transactions)) < 0
                    ? "text-expense"
                    : "text-income"
                )}
              >
                {transactions.length === 0
                  ? "---"
                  : `$${Math.floor(totalExpense(transactions))}`}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
