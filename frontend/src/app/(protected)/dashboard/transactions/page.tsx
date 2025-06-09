"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlusIcon } from "lucide-react";
import { TransactionsSpreadSheet } from "../components/transactions-display";
import { getTransactions } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Search from "@/components/widgets/search-input";

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
  const [search, setSearch] = useState<String>("");

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

  if (search) {
  filteredTransactions = filteredTransactions.filter(
    (txn) =>
      txn.name.toLowerCase().includes(search.toLowerCase()) ||
      txn.category.toLowerCase().includes(search.toLowerCase()) ||
      txn.notes.toLowerCase().includes(search.toLowerCase())
  );
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
      <TransactionsSpreadSheet
        transactions={filteredTransactions}
        header={
          <div className="flex flex-col lg:flex-row items-center justify-between gap-y-3">
            <h1 className="text-xl font-bold">All Transactions</h1>
            <div className="flex gap-2 items-center">
              <Search onValueChange={(e) => setSearch(e.target.value)} />
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
