"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/api";
import TransactionForm from "../../../components/transaction-form";
import { toast } from "sonner";
import { Transaction } from "@/lib/types";
import { deleteTransaction } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LoadingIndicator } from "@/components/loading-indicator";

export default function EditTransactionsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/api/transactions/${id}/`)
        .then((res) => setTransaction(res.data))
        .catch(() => toast("Failed to fetch transaction data!"));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await deleteTransaction(id);
    router.push("/dashboard/transactions");
  }

  const handleEdit = (data: {
    name: string;
    amount: number;
    type: string;
    category: string;
    date: Date;
    notes?: string;
  }) => {
    // Convert date to string (e.g., "2024-05-01")
    const payload = {
      ...data,
      date: data.date.toISOString().split("T")[0],
    };

    api
      .patch(`/api/transactions/edit/${id}/`, payload)
      .then((res) => {
        toast("Transaction updated!");
        router.replace("/dashboard/transactions");
      })
      .catch((err) => {
        toast("Failed to update transaction", { description: String(err) });
      });
  };

  if (!transaction) return <LoadingIndicator />;

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
              <BreadcrumbPage>Edit Transaction</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <TransactionForm
        method="edit-transaction"
        onSubmit={handleEdit}
        defaultValues={{
          ...transaction,
          date: new Date(transaction.date),
        }}
        transactionId={Number(id)}
        onDelete={handleDelete}
      />
    </div>
  );
}
