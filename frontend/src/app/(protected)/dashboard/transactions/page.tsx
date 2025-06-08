"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import api from "@/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";
import TransactionsDisplay from "../components/transactions-display";
import { getTransactions } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import Search from "@/components/search-input";

type Transaction = {
  id: string | number;
  name: string;
  category: string;
  type: string;
  amount: number;
  date: string;
  notes: string;
  // add other fields if needed
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortBy, setSortBy] = useState<
    "date" | "amount" | "expense" | "income"
  >("date");

  useEffect(() => {
    getTransactions(setTransactions);
  }, []);

  let filteredTransactions = [...transactions];

  if (sortBy === "income" || sortBy === "expense") {
    filteredTransactions = filteredTransactions.filter(
      (txn) => txn.type.toLowerCase() === sortBy
    );
  }

  if (sortBy === "date") {
    filteredTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sortBy === "amount") {
    filteredTransactions.sort((a, b) => b.amount - a.amount)
  }

  return (
    <div className="p-5">
      <div className="mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <TransactionsDisplay
        transactions={filteredTransactions}
        header={
          <div className="flex flex-col lg:flex-row items-center justify-between gap-y-3">
            <h1 className="text-xl font-bold">All Transactions</h1>
            <div className="flex gap-2 items-center">
              <Search />
              <Select
                value={sortBy}
                onValueChange={(value) =>
                  setSortBy(value as "date" | "amount" | "expense" | "income")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Button asChild>
                <Link href="/dashboard/transactions/add-transaction">
                  <CirclePlusIcon />
                  Add Transaction
                </Link>
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
