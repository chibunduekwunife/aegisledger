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
    getTransactions();
  }, []);

  const getTransactions = () => {
    api
      .get("/api/transactions/")
      .then((res) => res.data)
      .then((data) => {
        setTransactions(data);
        console.log(data);
      })
      .catch((err) => {
        toast("Uh oh! Something went wrong.", {
          description: String(err),
        });
      });
  };

  const deleteTransaction = (id: string | number) => {
    api
      .delete(`/api/transactions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast("Transaction deleted!");
          setTransactions((prev) =>
            prev.filter((txn: { id: string | number }) => txn.id !== id)
          );
        } else {
          toast("Failed to delete transaction");
        }
      })
      .catch((err) => {
        // console.error("Backend error:", err?.response?.data);
        toast("Uh oh! Something went wrong.", {
          description: String(err),
        });
      });
  };

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
      <h1 className="mb-5">View All Transactions</h1>
      <div className="flex flex-col gap-3">
        {transactions.map((txn) => (
          <Card key={txn.id}>
            <div className="flex justify-between items-center">
              <div>
                <CardHeader>
                  <CardTitle>{txn.name}</CardTitle>
                  <CardDescription>
                    {txn.type}: {txn.category}
                  </CardDescription>
                </CardHeader>
              </div>
              <div>
                <CardContent>
                  <p
                    className={clsx(
                      "text-end",
                      txn.type === "Income" ? "text-income" : "text-expense"
                    )}
                  >
                    {`$${txn.amount}`}
                  </p>
                  <CardDescription>{`Date: ${txn.date}`}</CardDescription>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
