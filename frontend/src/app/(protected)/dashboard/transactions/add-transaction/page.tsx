"use client";

import { useState, useEffect } from "react";
import api from "@/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import TransactionForm from "../../components/transaction-form";

export default function AddTransactionPage() {
  const router = useRouter();

  const createTransaction = (data: {
    name: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
    notes?: string;
  }) => {
    api
      .post("/api/transactions/", {
        ...data,
        notes: data.notes ?? "",
        date: data.date.toISOString().split("T")[0], // ensure date is string
      })
      .then((res) => {
        if (res.status === 201) {
          toast("Transaction created!");
          router.replace("/dashboard/transactions");
        } else {
          toast("Failed to create transaction");
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
              <BreadcrumbLink href="/dashboard/transactions">
                Transactions
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Transaction</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <TransactionForm method="add-transaction" onSubmit={createTransaction} />
    </div>
  );
}
