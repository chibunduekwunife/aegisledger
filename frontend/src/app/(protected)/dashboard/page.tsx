"use client";

import { useState, useEffect } from "react";
import BalancesSection from "./components/balance-view";
import DataSection from "./components/data-view";
import TransactionsDisplay from "./components/transactions-display";
import { CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Transaction } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BotIcon, PlusCircleIcon } from "lucide-react";
import { getTransactions } from "@/lib/utils";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions(setTransactions);
  }, []);


  return (
    <div className="flex flex-col gap-3 p-5">
      <BalancesSection />
      <DataSection />
      <TransactionsDisplay
        transactions={transactions}
        slice={3}
        header={
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-500">Recent Transactions</CardTitle>
            <Link
              href="/dashboard/transactions"
              className={buttonVariants({ variant: "link" })}
            >
              View All
            </Link>
          </div>
        }
        footer={
          <div className="w-full flex justify-center md:justify-end gap-2">
            <Button asChild>
                <Link href="/dashboard/transactions/add-transaction">
                  <PlusCircleIcon />
                  Add Transaction
                </Link>
              </Button>
              <Button asChild>
                <Link href="#">
                  <BotIcon />
                  Ask AI
                </Link>
              </Button>
          </div>
        }
      />
    </div>
  );
}
