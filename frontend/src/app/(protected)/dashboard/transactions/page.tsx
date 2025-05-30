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

  useEffect(() => {
    getTransactions(setTransactions);
  }, []);

  //how to use the deleteTransaction function from utils.ts

  // const handleDelete = (id: string | number) => {
  //   deleteTransaction(id, () =>
  //     setTransactions((prev) => prev.filter((txn) => txn.id !== id))
  //   );
  // };

  // // ...

  // <TransactionsDisplay
  //   transactions={transactions}
  //   // Pass handleDelete to your child if needed
  // />;

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
        transactions={transactions}
        header={
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">All Transactions</h1>
            <div>
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
