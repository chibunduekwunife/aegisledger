import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import api from "@/api";
import { toast } from "sonner";
import { Transaction } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTransactions(setTransactions: (txns: Transaction[]) => void) {
  api
    .get("/api/transactions/")
    .then((res) => res.data)
    .then((data) => {
      setTransactions(data);
    })
    .catch((err) => {
      toast("Uh oh! Something went wrong.", {
        description: String(err),
      });
    });
}

export async function getTransactionsPromise(): Promise<Transaction[]> {
  try {
    const res = await api.get("/api/transactions/");
    return res.data;
  } catch (err) {
    toast("Uh oh! Something went wrong.", {
      description: String(err),
    });
    return [];
  }
}

export function deleteTransaction(
  id: string | number,
  onSuccess?: () => void,
  onError?: (err: unknown) => void
) {
  api
    .delete(`/api/transactions/delete/${id}/`)
    .then((res) => {
      if (res.status === 204) {
        toast("Transaction deleted!");
        if (onSuccess) onSuccess();
      } else {
        toast("Failed to delete transaction");
      }
    })
    .catch((err) => {
      toast("Uh oh! Something went wrong.", {
        description: String(err),
      });
      if (onError) onError(err);
    });
}


