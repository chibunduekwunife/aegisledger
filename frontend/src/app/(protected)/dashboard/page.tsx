"use client";

import { useState, useEffect } from "react";
import api from "@/api";
import TransactionsSection from "./components/transactions";
import BalancesSection from "./components/balance-view";


export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

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
      .catch((err) => alert(err));
  };

  const deleteTransaction = (id: string | number) => {
    api
      .delete(`/api/transactions/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Transaction deleted!");
          setTransactions((prev) =>
            prev.filter((txn: { id: string | number }) => txn.id !== id)
          );
        } else {
          alert("Failed to delete transaction");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <BalancesSection/>
      <TransactionsSection transactions={transactions} />
    </div>
  );
}
