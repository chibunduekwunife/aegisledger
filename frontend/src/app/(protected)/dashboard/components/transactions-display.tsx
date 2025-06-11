import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Transaction } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";

interface TransactionsSectionProps {
  transactions: Transaction[];
  footer?: React.ReactNode;
  header?: React.ReactNode;
  slice?: number;
}

export default function TransactionsDisplay({
  transactions,
  footer,
  header,
  slice,
}: TransactionsSectionProps) {
  const txns = transactions ?? [];
  const displayTxns = slice ? txns.slice(0, slice) : txns;
  return (
    <Card>
      <CardHeader>{header}</CardHeader>
      <CardContent>
        {displayTxns.length > 0 ? (
          <div>
            <div className="flex flex-col gap-3">
              {displayTxns.map((txn) => (
                <Link
                  key={txn.id}
                  href={`/dashboard/transactions/edit-transaction/${txn.id}`}
                  className="block"
                >
                  <Card>
                    <CardContent className="flex justify-between items-center py-4">
                      {/* Left: Name, type, category in a row */}
                      <div className="flex flex-col items-left gap-x-4 min-w-0">
                        <span className="font-semibold truncate">
                          {txn.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          {txn.type}: {txn.category}
                        </span>
                      </div>
                      {/* Right: Amount and date */}
                      <div className="text-end">
                        <p
                          className={clsx(
                            txn.type === "Income"
                              ? "text-income"
                              : "text-expense"
                          )}
                        >
                          {`$${txn.amount}`}
                        </p>
                        <span className="text-xs text-gray-400">{`Date: ${txn.date}`}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="mb-5 text-gray-600 text-sm">
            Add a new transaction to display
          </h1>
        )}
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}

export const TransactionsSpreadSheet = ({
  transactions,
  footer,
  header,
  slice,
}: TransactionsSectionProps) => {
  const txns = transactions ?? [];
  const displayTxns = slice ? txns.slice(0, slice) : txns;

  return (
    <Card>
      <CardHeader>{header}</CardHeader>
      <CardContent>
        {displayTxns.length > 0 ? (
          <div>
            {/* Grid Heading */}
            <div className="grid grid-cols-[1.5fr_2.5fr_1fr_1fr] md:grid-cols-[1fr_2fr_3fr_1fr_1fr] items-stretch font-semibold bg-sidebar text-white text-sm border-b">
              <span className="py-2 px-2 md:px-4 border-r">Date</span>
              <span className="py-2 px-2 md:px-4 border-r">Name</span>
              <span className="hidden md:inline py-2 px-2 md:px-4 border-r">
                Description
              </span>
              <span className="py-2 px-2 md:px-4 border-r text-center">
                Income
              </span>
              <span className="py-2 px-2 md:px-4 text-center">Expense</span>
            </div>
            <div className="flex flex-col">
              {displayTxns.map((txn, idx) => (
                <Link
                  key={txn.id}
                  href={`/dashboard/transactions/edit-transaction/${txn.id}`}
                  className="block"
                >
                  <div
                    className={
                      clsx(
                        "border",
                        idx % 2 === 0 ? "bg-secondary" : "bg-white"
                      )
                    }
                  >
                    <div className="grid grid-cols-[1.5fr_2.5fr_1fr_1fr] md:grid-cols-[1fr_2fr_3fr_1fr_1fr] items-stretch">
                      <span className="text-gray-400 py-2 px-2 md:px-4 border-r flex items-center h-full">
                        {txn.date}
                      </span>
                      <span className="py-2 px-2 md:px-4 border-r flex items-center h-full">
                        {txn.name}
                      </span>
                      <span className="hidden md:flex py-2 px-2 md:px-4 border-r items-center h-full text-gray-500">
                        {txn.notes || "-"}
                      </span>
                      <span className={clsx(
                        "py-2 px-2 md:px-4 border-r flex items-center h-full text-center",
                        txn.type === "Income" ? "text-black" : "text-income"
                      )}>
                        {txn.type === "Income" && `$${txn.amount}`}
                      </span>
                      <span className={clsx(
                        "px-2 md:px-4 py-2 flex items-center h-full text-center",
                        txn.type === "Expense" ? "text-black" : "text-expense"
                      )}>
                        {txn.type === "Expense" && `$${txn.amount}`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="mb-5 text-gray-600 text-sm">
            Add a new transaction to display
          </h1>
        )}
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
