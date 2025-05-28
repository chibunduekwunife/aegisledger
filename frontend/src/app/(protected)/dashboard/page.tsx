"use client";

import { useState, useEffect } from "react";
import api from "@/api";
import TransactionsSection from "./components/transaction-view";
import BalancesSection from "./components/balance-view";
import DataSection from "./components/data-view";
import { toast } from "sonner";


export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-3 p-5">
      <BalancesSection/>
      <DataSection />
      <TransactionsSection />
    </div>
  );
}
